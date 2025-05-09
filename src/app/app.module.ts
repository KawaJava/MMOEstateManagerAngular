import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullpageadminModule } from './layouts/fullpageadmin/fullpageadmin.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminLoginModule } from './layouts/fullpageadminlogin/admin-login/admin-login.module';
import { JwtInterceptor } from './modules/common/interceptor/jwt.interceptor';
import { AdminAuthorizeGuard } from './modules/common/guard/adminAuthorizeGuard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DefaultModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FullpageadminModule,
    AdminLoginModule
  ],
  exports: [
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AdminAuthorizeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
