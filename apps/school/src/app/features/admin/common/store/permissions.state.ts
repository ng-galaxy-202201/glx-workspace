import { Injectable } from '@angular/core';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import { catchError, iif, NEVER, of, switchMap, tap, throwError } from 'rxjs';
import { RolPermission } from '../../domain/models/rol-permission.model';
import { PermissionsHttp } from '../http/permissions.http';

export class PermissionsActionLoad {
  static readonly type = '[Permissions] Load';
}

export class PermissionsActionInitialize {
  static readonly type = '[Permissions] Initialize';
  constructor(public permissions: RolPermission[]) {}
}

interface PermissionsStateModel {
  permissions: RolPermission[];
  loaded: boolean;
  error: any;
}

@State<PermissionsStateModel>({
  name: 'permissionsState',
  defaults: {
    permissions: [],
    loaded: false,
    error: null
  },
})
@Injectable()
export class PermissionsState {
  constructor(private permissionsHttp: PermissionsHttp) {}

  @Selector()
  static permissions(state: PermissionsStateModel) {
    return state.permissions;
  }

  @Selector()
  static loaded(state: PermissionsStateModel) {
    return state.loaded;
  }

  @Action(PermissionsActionInitialize)
  initilize(
    ctx: StateContext<PermissionsStateModel>,
    action: PermissionsActionInitialize
  ) {
    ctx.patchState({
      permissions: action.permissions,
      loaded: true,
    });
  }

  @Action(PermissionsActionLoad)
  load(ctx: StateContext<PermissionsStateModel>) {
    const state = ctx.getState();
    return of(state.loaded).pipe(
      switchMap((loaded) =>
        iif(() => loaded, NEVER, this.permissionsHttp.getAll())
      ),
      /*
      catchError(err => {
        ctx.dispatch(new PermissionsActionError(err))

        return throwError(() => err)
      }), */
      tap((permissions) =>
        ctx.dispatch(new PermissionsActionInitialize(permissions))
      ),
    );
  }
}
