import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

import { AuthHeaderInterceptorService } from './shared/interceptors/auth-header-interceptor.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorpageComponent,
    HomeComponent
  ],

  imports: [
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    ConfigurationModule,
    ProductModule,
    UserModule,
    AppRoutingModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptorService,
      multi: true
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
