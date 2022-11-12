import { Component, OnInit } from '@angular/core';
import { UsersHttp } from '../../http/users.http';
import { User } from '../../models/user.model';

@Component({
  templateUrl: './users.view.html',
  styleUrls: ['./users.view.scss']
})
export class UsersView implements OnInit {
  displayedColumns: string[] = ['documentNumber', 'email', 'fullname', 'isSuperuser'];
  users: User[] = [];

  constructor(private usersHttp: UsersHttp) { }

  ngOnInit(): void {
    this.usersHttp.getAll()
      .subscribe(users => this.users = users)
  }

}
