import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCoreModule } from './core/core.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppCoreModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
