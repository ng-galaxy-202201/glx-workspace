import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSession } from '@school/common/auth/services/auth-session.service';
import { environment } from 'apps/school/src/environments/environment';
import { AuthHttp } from '../../http/auth.http';

@Component({
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss'],
})
export class SignInView implements OnInit {
  signInForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(
    fb: FormBuilder,
    private authHttp: AuthHttp,
    private router: Router,
    private authSession: AuthSession,
  ) {
    this.signInForm = fb.nonNullable.group({
      email: [environment.auth.email, [Validators.required, Validators.email]],
      password: [environment.auth.password, Validators.required],
    });
  }

  ngOnInit(): void {}

  signIn() {
    this.authHttp.signIn(this.signInForm.getRawValue())
      .subscribe(token => {
        this.authSession.create(token)
        this.router.navigateByUrl('/admin')
      });
  }
}
