import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'apps/school/src/environments/environment';
import { customFromError, errorFromStatus, ErrorHttpHandlerInterceptor } from './error-http-handler.interceptor';

describe('ErrorHttpHandlerInterceptor', () => {
  let interceptor: ErrorHttpHandlerInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let matSnackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorHttpHandlerInterceptor,
        multi: true
      }],
    });
  });

  beforeEach(() => {
    matSnackBar = TestBed.inject(MatSnackBar);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('intercept', () => {
    const endpoint = `http://test`;

    beforeEach(() => {
      spyOn(matSnackBar, 'open');

      httpClient
        .get(endpoint)
        .subscribe({
          error: (err) => expect(err).toBeDefined()
        })
    })

    afterEach(() => {
      httpTestingController.verify();
    })

    it('should get general error', () => {
      httpTestingController
        .expectOne(endpoint)
        .flush('', { status: 500, statusText: 'Internal Error' });

      const msg = errorFromStatus.get(500)!;
      expect(matSnackBar.open).toHaveBeenCalledWith(msg, 'Ok', { duration: 3000 })
    });

    it('should get 400 error', () => {
      const CUSTOM_ERROR_CODE = 'ERR_USR_0001';

      httpTestingController
        .expectOne(endpoint)
        .flush({ message: CUSTOM_ERROR_CODE }, { status: 400, statusText: 'Internal Error' });

      const msg = customFromError.get(CUSTOM_ERROR_CODE)!;
      expect(matSnackBar.open).toHaveBeenCalledWith(msg, 'Ok', { duration: 3000 })
    });
  })
});
