## Documentación Oficial 

https://www.ngxs.io/

## Intalación

```
npm install @ngxs/store --save
```

## Configuración

Importar en AppModule

```
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    NgxsModule.forRoot([], { developmentMode: !environment.production })
  ],
})
export class AppModule { }
```

## Configuracion para un modulo Lazy loading 

```
imports: [NgxsModule.forFeature([PermissionsState])],
```

## Crear un estado

```
interface PermissionsStateModel {
  permissions: RolPermission[];
  loaded: boolean;
}

@State<PermissionsStateModel>({
  name: 'permissionsState',
  defaults: {
    permissions: [],
    loaded: false
  }
})
@Injectable()
export class PermissionsState {
}
```

## Crear un selector

```
export class PermissionsState {
  @Selector()
  static permissions(state: PermissionsStateModel) {
    return state.permissions;
  }
}
```

Acceder al selector desde el componente

```
@Component()
export class UserFormComponent implements OnChanges {
  @Select(PermissionsState.permissions)
  permissions$!: Observable<RolPermission[]>;
}
```

## Crear una acción

Creador de acción

```
export class PermissionsActionInitialize {
  static readonly type = '[Permissions] Initialize';
  constructor(public permissions: RolPermission[]) {}
}

```

Acción dentro del estado

```
export class PermissionsState {
  @Action(PermissionsActionInitialize)
  initilize(ctx: StateContext<PermissionsStateModel>, action: PermissionsActionInitialize) {
    ctx.patchState({
      permissions: action.permissions,
      loaded: true
    })
  }
}
```

Ejecutar Accion 

```
@Component()
export class UserFormComponent implements OnChanges {
  constructor(
    private store: Store
  ) {
    this.store.dispatch(new PermissionsActionInitialize([]))
  }
}
```


## Instalar devtools

```
npm install @ngxs/devtools-plugin --save-dev
```

Configuración: Agregar modulo en el AppModule

```
NgxsReduxDevtoolsPluginModule.forRoot()
```

Instalar Extensión de Chrome llamada `Redux DevTools`
