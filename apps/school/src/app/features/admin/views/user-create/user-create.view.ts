import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersHttp } from '../../common/http/users.http';
import { UserDTO } from '../../domain/dto/user.dto';

@Component({
  templateUrl: './user-create.view.html',
  styleUrls: ['./user-create.view.scss']
})
export class UserCreateView implements OnInit {
  constructor(
    private usersHttp: UsersHttp,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  save(userFormValue: UserDTO) {
    this.usersHttp.create(userFormValue)
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route })
      })
  }

}
