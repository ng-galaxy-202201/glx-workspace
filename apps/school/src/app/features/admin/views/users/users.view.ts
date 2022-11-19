import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthSession } from '@school/common/auth/services/auth-session.service';
import { UsersHttp } from '../../common/http/users.http';
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
  users: User[] = [];

  @ViewChild('ConfirmTemplate') confirmTemplate!: TemplateRef<HTMLDivElement>;

  constructor(
    private usersHttp: UsersHttp,
    private dialog: MatDialog,
    protected authSession: AuthSession,
  ) {}

  ngOnInit(): void {
    this.usersHttp.getAll().subscribe((users) => (this.users = users));
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
    this.usersHttp.delete(id)
      .subscribe(() => {
        this.dialog.closeAll();
        this.users = this.users.filter(user => user.id != id);
      })
  }
}
