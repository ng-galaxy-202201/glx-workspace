import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundView } from '../../../core/views/not-found/not-found.view';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { Router } from '@angular/router';
import { AuthSession } from '../services/auth-session.service';
import { Location } from '@angular/common';

describe('IsAuthenticatedGuard', () => {
  let router: Router;
  let location: Location;
  let authSession: AuthSession;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'admin', component: NotFoundView, canActivate: [IsAuthenticatedGuard] }
        ])
      ],
    });
  });

  beforeEach(() => {
    authSession = TestBed.inject(AuthSession);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('should enter to admin', () => {
    spyOn(authSession, 'isAuthenticated').and.returnValue(true);
    router.navigateByUrl('/admin').then(() => {
      expect(location.path()).toBe('/admin')
    })
  })

});
