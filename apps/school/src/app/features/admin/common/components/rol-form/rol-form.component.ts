import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RolDTO } from '../../../domain/interfaces/rol-dto.interface';
import { RolPermission, RolWithPermission } from '../../../domain/models/rol-permission.model';
import { PermissionsHttp } from '../../http/permissions.http';

@Component({
  selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  styleUrls: ['./rol-form.component.scss']
})
export class RolFormComponent {
  rolForm: FormGroup;
  permissions$: Observable<RolPermission[]>;

  @Input() backPath = '../';
  @Input() rol?: RolWithPermission;
  @Output() save: EventEmitter<RolDTO> = new EventEmitter();

  constructor(
    fb: FormBuilder,
    private permissionsHttp: PermissionsHttp,
  ) {
    this.rolForm = fb.group({
      name: ['', Validators.required],
      permissions: [[], Validators.required],
    })

    this.permissions$ = this.permissionsHttp.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rol'].currentValue) {
      this.patchForm(changes['rol'].currentValue);
    }
  }

  patchForm(user: RolWithPermission) {
    this.rolForm.patchValue({
      name: user.name,
      permissions: user.permissions.map(permission => permission.id),
    })
  }

  submitForm() {
    if (this.rolForm.invalid) return;
    this.save.emit(this.rolForm.value);
  }
}
