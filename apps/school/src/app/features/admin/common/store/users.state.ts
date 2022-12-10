import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { iif, NEVER, of, switchMap, tap } from 'rxjs';
import { UserDTO } from '../../domain/dto/user.dto';
import { User, UserWithPermissions } from '../../domain/models/user.model';
import { UsersHttp } from '../http/users.http';

export class UsersActionLoad {
  static readonly type = '[Users] Load';
}

export class UsersActionLoadDetail {
  static readonly type = '[Users] Load Detail';
  constructor(public userId: number) {}
}

export class UsersActionCreate {
  static readonly type = '[Users] Create';
  constructor(public userDto: UserDTO) {}
}

export class UsersActionUpdate {
  static readonly type = '[Users] Update';
  constructor(public userId: number, public userDto: UserDTO) {}
}

export class UsersActionDelete {
  static readonly type = '[Users] Delete';
  constructor(public userId: number) {}
}

interface UsersStateModel {
  users: User[];
  userSelected?: UserWithPermissions;
  loaded: boolean;
}

@State<UsersStateModel>({
  name: 'usersState',
  defaults: {
    users: [],
    loaded: false,
  },
})
@Injectable()
export class UsersState {
  constructor(private usersHttp: UsersHttp) {}

  @Selector()
  static users(state: UsersStateModel) {
    return state.users;
  }

  @Selector()
  static selected(state: UsersStateModel) {
    return state.userSelected;
  }

  @Action(UsersActionLoad)
  load(ctx: StateContext<UsersStateModel>) {
    const state = ctx.getState();
    return of(state.loaded).pipe(
      switchMap((loaded) => iif(() => loaded, NEVER, this.usersHttp.getAll())),
      tap((users) =>
        ctx.patchState({
          users,
          loaded: true,
        })
      )
    );
  }

  @Action(UsersActionLoadDetail)
  loadDetail(
    ctx: StateContext<UsersStateModel>,
    action: UsersActionLoadDetail
  ) {
    const state = ctx.getState();
    const selected = state.users.find(user => user.id === action.userId)
    console.log(selected)
    return of(selected)
      .pipe(
        switchMap((selected) =>
          iif(
            () => !!selected && selected instanceof UserWithPermissions,
            of(selected),
            this.usersHttp.getOne(action.userId)
          )
        )
      )
      .pipe(
        tap((userWithPermissions) => {
          if (!!userWithPermissions && userWithPermissions instanceof UserWithPermissions) {
            ctx.patchState({
              userSelected: userWithPermissions,
              users: state.users.map((user) => {
                if (user.id === action.userId) {
                  return userWithPermissions;
                }
                return user;
              }),
            });
          }
        })
      );
  }

  @Action(UsersActionCreate)
  create(ctx: StateContext<UsersStateModel>, action: UsersActionCreate) {
    const state = ctx.getState();
    return this.usersHttp.create(action.userDto).pipe(
      tap((userWithPermissions) => {
        ctx.patchState({
          users: [...state.users, userWithPermissions],
        });
      })
    );
  }

  @Action(UsersActionUpdate)
  update(ctx: StateContext<UsersStateModel>, action: UsersActionUpdate) {
    const state = ctx.getState();
    return this.usersHttp.update(action.userId, action.userDto).pipe(
      tap((userWithPermissions) => {
        ctx.patchState({
          users: state.users.map((user) => {
            if (user.id === action.userId) {
              return userWithPermissions;
            }
            return user;
          }),
        });
      })
    );
  }

  @Action(UsersActionDelete)
  delete(ctx: StateContext<UsersStateModel>, action: UsersActionDelete) {
    const state = ctx.getState();
    return this.usersHttp.delete(action.userId).pipe(
      tap(() => {
        ctx.patchState({
          users: state.users.filter((user) => user.id !== action.userId),
        });
      })
    );
  }
}
