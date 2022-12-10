import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UsersHttp } from '../../common/http/users.http';
import { UsersActionCreate } from '../../common/store/users.state';
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
    private store: Store,
  ) {
  }

  ngOnInit(): void {
  }

  save(userFormValue: UserDTO) {
    this.store.dispatch(new UsersActionCreate(userFormValue))
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route })
      })
  }

}
