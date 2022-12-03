import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PERMISSIONS } from '@school/common/auth/constants/permissions';
import { AuthUser } from '@school/common/auth/models/auth-user.model';
import { AuthSession } from '@school/common/auth/services/auth-session.service';

interface MenuOption {
  title: string;
  path: string;
  permissions: string | string[];
}

const MENU_OPTIONS: MenuOption[] = [
  { title: 'Usuarios', path: './users', permissions: PERMISSIONS.USER_READ },
  { title: 'Roles', path: './rols', permissions: PERMISSIONS.ROL_READ },
  { title: 'Asistencia', path: './attendance', permissions: PERMISSIONS.ATTENDANCE_READ },
];
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user: AuthUser;
  menuOptions: MenuOption[] = [];

  constructor(private authSession: AuthSession, private router: Router) {
    this.user = this.authSession.getUser();
    this.menuOptions = MENU_OPTIONS.filter((menuOption) =>
      this.user.hasPermissions(menuOption.permissions)
    );
  }

  ngOnInit(): void {}

  closeSession() {
    this.authSession.destroy();
    this.router.navigate(['/']);
  }
}
