## Estructura Suite de pruebas

```
describe('SignInView', () => {

  beforeAll(() => {})
  beforeEach(() => {})
  afterEach(() => {})
  afterAll(() => {})

  it('should create', () => {
    expect('').toBeDefined();
  })

  it('should create', () => {
    expect('').toBeDefined();
  })

  it('should create', () => {
    expect('').toBeDefined();
  })

})
```


## Base para probar component 

```
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SignInView } from './sign-in.view';

describe('SignInView', () => {
  let fixture: ComponentFixture<SignInView>;
  let component: SignInView;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignInView],
      imports: [
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInView);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeDefined();
  })

})
```

## Espias

```
// Reemplaza el valor que retorna el metodo (Tiene que retornar el mismo tipo de dato original)
spyOn(authHttp, 'signIn').and.returnValue(of({}))

// Deja que ejecute el metodo real pero lo observa para poder probar que se ha ejecutado
spyOn(authHttp, 'signIn').and.callThrough()
```

## Base para probar un servicio 

```
import { TestBed } from '@angular/core/testing';
import { AuthHttp } from './auth.http';

describe('AuthHttp', () => {
  let service: AuthHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHttp]
    })
  })

  beforeEach(() => {
    service = TestBed.inject(AuthHttp)
  })

  it('should create', () => {
    expect(service).toBeDefined();
  })

})
```
