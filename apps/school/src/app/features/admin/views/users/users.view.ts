import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { AuthSession } from '@school/common/auth/services/auth-session.service';
import { Observable } from 'rxjs';
import { UsersHttp } from '../../common/http/users.http';
import { UsersActionDelete, UsersActionLoad, UsersState } from '../../common/store/users.state';
import { User } from '../../domain/models/user.model';

@Component({
  templateUrl: './users.view.html',
  styleUrls: ['./users.view.scss'],
})
export class UsersView implements OnInit {
  displayedColumns: string[] = [
    'documentNumber',
    'email',
    'fullname',
    'isSuperuser',
    'actions',
  ];

  @Select(UsersState.users) users$!: Observable<User[]>;

  @ViewChild('ConfirmTemplate') confirmTemplate!: TemplateRef<HTMLDivElement>;

  constructor(
    private usersHttp: UsersHttp,
    private dialog: MatDialog,
    protected authSession: AuthSession,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new UsersActionLoad())
  }

  confirmDelete(user: User) {
    this.dialog.open(this.confirmTemplate, {
      data: {
        id: user.id,
        fullname: user.fullname,
      },
    });
  }

  deleteUser(id: number) {
    this.store.dispatch(new UsersActionDelete(id))
      .subscribe(() => {
        this.dialog.closeAll();
      })
  }
}
