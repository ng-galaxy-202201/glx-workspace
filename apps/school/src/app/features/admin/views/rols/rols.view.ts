import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthSession } from '@school/common/auth/services/auth-session.service';
import { RolsHttp } from '../../common/http/rols.http';
import { RolPermission } from '../../domain/models/rol-permission.model';

@Component({
  templateUrl: './rols.view.html',
  styleUrls: ['./rols.view.scss']
})
export class RolsView implements OnInit {
  displayedColumns: string[] = [
    'name',
    'actions',
  ];
  rols: RolPermission[] = [];

  @ViewChild('ConfirmTemplate') confirmTemplate!: TemplateRef<HTMLDivElement>;

  constructor(
    private rolsHttp: RolsHttp,
    private dialog: MatDialog,
    protected authSession: AuthSession,
  ) {}

  ngOnInit(): void {
    this.rolsHttp.getAll().subscribe((rols) => (this.rols = rols));
  }

  confirmDelete(rol: RolPermission) {
    this.dialog.open(this.confirmTemplate, {
      data: {
        id: rol.id,
        name: rol.name,
      },
    });
  }

  deleteRol(id: number) {
    this.rolsHttp.delete(id)
      .subscribe(() => {
        this.dialog.closeAll();
        this.rols = this.rols.filter(rol => rol.id != id);
      })
  }
}
