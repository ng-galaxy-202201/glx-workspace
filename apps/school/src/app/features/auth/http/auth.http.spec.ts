import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'apps/school/src/environments/environment';
import { AuthHttp } from './auth.http';

describe('AuthHttp', () => {
  const authDto = {
    email: 'test',
    password: 'test',
  };

  describe('Spy', () => {
    let service: AuthHttp;
    let httpClient: HttpClient;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [AuthHttp],
        imports: [HttpClientModule],
      });
    });

    beforeEach(() => {
      service = TestBed.inject(AuthHttp);
      httpClient = TestBed.inject(HttpClient);
    });

    it('should create', () => {
      expect(service).toBeDefined();
    });

    it('should signIn', () => {

      spyOn(httpClient, 'post');

      service.signIn(authDto);

      expect(httpClient.post).toHaveBeenCalled();
    });
  });

  describe('TestingModule', () => {
    let service: AuthHttp;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [AuthHttp],
        imports: [HttpClientTestingModule],
      });
    });

    beforeEach(() => {
      service = TestBed.inject(AuthHttp);
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should create', () => {
      expect(service).toBeDefined();
    });

    it('can test HttpClient.get', () => {
      const signInEndpoint = `${environment.baseUrl}/auth/token`;
      const authToken = { access: 'accessToken', refresh: 'refreshToken' };

      service.signIn(authDto).subscribe((data) =>
        expect(data).toEqual(authToken)
      );

      const req = httpTestingController.expectOne(signInEndpoint);
      expect(req.request.method).toEqual('POST');

      req.flush(authToken);

      httpTestingController.verify();
    });
  });
});
