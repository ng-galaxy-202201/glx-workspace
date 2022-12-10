import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsersHttp } from '../../common/http/users.http';
import { UsersActionLoadDetail, UsersActionUpdate, UsersState } from '../../common/store/users.state';
import { UserDTO } from '../../domain/dto/user.dto';
import { UserWithPermissions } from '../../domain/models/user.model';

@Component({
  templateUrl: './user-update.view.html',
  styleUrls: ['./user-update.view.scss']
})
export class UserUpdateView implements OnInit {
  id: number;

  @Select(UsersState.selected)
  user$!: Observable<UserWithPermissions>;

  constructor(
    private usersHttp: UsersHttp,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.store.dispatch(new UsersActionLoadDetail(this.id))
  }

  save(userFormValue: UserDTO) {
    this.store.dispatch(new UsersActionUpdate(this.id, userFormValue))
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route })
      })
  }

}
