import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdalService, AdalGuard, AdalInterceptor } from 'adal-angular4';
import {AlertComponent} from './Directives/alert.component'
import { AlertService } from './Services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AdalService,AdalGuard,{provide:HTTP_INTERCEPTORS,useClass:AdalInterceptor,multi:true},AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
