import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { PermissionsState } from './permissions.state';
import { UsersState } from './users.state';

@NgModule({
  imports: [NgxsModule.forFeature([PermissionsState, UsersState])],
  exports: [NgxsModule],
})
export class AdminStoreModule {}
