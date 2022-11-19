import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthSession } from '../services/auth-session.service';

@Injectable({
  providedIn: 'root',
})
export class HasPermissionsGuard implements CanActivate {
  constructor(private authSession: AuthSession, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const permissions = route.data['permissions'] || '';
    return (
      this.authSession.getUser().hasPermissions(permissions) ||
      this.router.parseUrl('/not-have-permissions')
    );
  }
}
