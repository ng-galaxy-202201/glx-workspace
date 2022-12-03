import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserDTO } from '../../../domain/dto/user.dto';
import { RolPermission } from '../../../domain/models/rol-permission.model';
import { UserWithPermissions } from '../../../domain/models/user.model';
import { PermissionsHttp } from '../../http/permissions.http';
import { RolsHttp } from '../../http/rols.http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  userForm: FormGroup;
  permissions$: Observable<RolPermission[]>;
  rols$: Observable<RolPermission[]>;

  @Input() backPath = '../';
  @Input() user?: UserWithPermissions;
  @Output() save: EventEmitter<UserDTO> = new EventEmitter();

  constructor(
    fb: FormBuilder,
    private permissionsHttp: PermissionsHttp,
    private rolsHttp: RolsHttp,
  ) {
    this.userForm = fb.group({
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      isSuperuser: [false, Validators.required],
      permissions: [[]],
      rols: [[]],
    })

    this.permissions$ = this.permissionsHttp.getAll();
    this.rols$ = this.rolsHttp.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'].currentValue) {
      this.patchForm(changes['user'].currentValue);
    }
  }

  patchForm(user: UserWithPermissions) {
    this.userForm.patchValue({
      dni: user.dni,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isSuperuser: user.isSuperuser,
      permissions: user.permissions.map(permission => permission.id),
      rols: user.rols.map(rol => rol.id),
    })
  }

  submitForm() {
    if (this.userForm.invalid) return;
    this.save.emit(this.userForm.value);
  }
}
