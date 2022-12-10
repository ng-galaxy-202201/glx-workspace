import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { RolPermission } from '../../domain/models/rol-permission.model';
import { PermissionsHttp } from '../http/permissions.http';
import { PermissionsActionInitialize, PermissionsActionLoad, PermissionsState } from './permissions.state';

const permissions: RolPermission[] = [
  new RolPermission({ id: 1, name: 'USERS_LIST' })
]

export class PermissionsHttpStup {
  getAll() {
    return of(permissions);
  }
}

describe('PermissionsState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([PermissionsState])
      ],
      providers: [
        {
          provide: PermissionsHttp,
          useClass: PermissionsHttpStup
        }
      ]
    });

    store = TestBed.inject(Store);
  });

  it('should load', () => {
    store.dispatch(new PermissionsActionLoad());
    const permissionsFromStore = store.selectSnapshot(state => state.permissionsState.permissions);
    expect(permissionsFromStore).toEqual(permissions);
  });

  it('it should select permissions', () => {
    const permissions = store.selectSnapshot(PermissionsState.permissions);
    expect(permissions).toEqual([]);
  });

  it('it should select loaded', () => {
    const loaded = store.selectSnapshot(PermissionsState.loaded);
    expect(loaded).toBeFalse();
  });
});
