import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsHttp } from '../../http/permissions.http';
import { RolsHttp } from '../../http/rols.http';
import { UsersHttp } from '../../http/users.http';
import { RolPermission } from '../../models/rol-permission.model';

@Component({
  templateUrl: './user-create.view.html',
  styleUrls: ['./user-create.view.scss']
})
export class UserCreateView implements OnInit {
  userForm: FormGroup;
  permissions$: Observable<RolPermission[]>;
  rols$: Observable<RolPermission[]>;

  constructor(
    fb: FormBuilder,
    private permissionsHttp: PermissionsHttp,
    private rolsHttp: RolsHttp,
    private usersHttp: UsersHttp,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.userForm = fb.group({
      dni: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      isSuperuser: ['', Validators.required],
      permissions: ['', Validators.required],
      rols: ['', Validators.required],
    })

    this.permissions$ = this.permissionsHttp.getAll();
    this.rols$ = this.rolsHttp.getAll();
  }

  ngOnInit(): void {
  }

  save() {
    if (this.userForm.invalid) return;
    this.usersHttp.create(this.userForm.value)
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route })
      })
  }

}
