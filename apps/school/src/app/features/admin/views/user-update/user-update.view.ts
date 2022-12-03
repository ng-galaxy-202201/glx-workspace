import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersHttp } from '../../common/http/users.http';
import { UserDTO } from '../../domain/dto/user.dto';
import { UserWithPermissions } from '../../domain/models/user.model';

@Component({
  templateUrl: './user-update.view.html',
  styleUrls: ['./user-update.view.scss']
})
export class UserUpdateView implements OnInit {
  id: number;
  user?: UserWithPermissions;

  constructor(
    private usersHttp: UsersHttp,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.usersHttp.getOne(this.id)
      .subscribe(user => this.user = user)
  }

  save(userFormValue: UserDTO) {
    this.usersHttp.update(this.id, userFormValue)
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route })
      })
  }

}
