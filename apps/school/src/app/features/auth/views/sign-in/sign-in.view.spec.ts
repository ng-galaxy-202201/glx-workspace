import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthHttp } from '../../http/auth.http';
import { SignInView } from './sign-in.view';

export class AuthHttpStup {
  signIn() {
    return of({ access: '', refresh: '' });
  }
}

describe('SignInView', () => {
  let fixture: ComponentFixture<SignInView>;
  let component: SignInView;
  let authHttp: AuthHttp;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignInView],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AuthHttp, useClass: AuthHttpStup } // Remplaza servicio real por falso
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    router = TestBed.inject(Router)
    authHttp = TestBed.inject(AuthHttp);
    fixture = TestBed.createComponent(SignInView);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeDefined();
  })

  it('should signIn', () => {
    const formValues = {
      email: 'test@test.com',
      password: 'test1234'
    };
    spyOn(authHttp, 'signIn').and.callThrough();
    spyOn(router, 'navigateByUrl')
    component.signInForm.patchValue(formValues)
    component.signIn()
    expect(authHttp.signIn).toHaveBeenCalledWith(formValues);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  })
})
