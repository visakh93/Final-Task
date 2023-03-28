import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import{MatProgressBarModule} from '@angular/material/progress-bar';
import {BrowserAnimationsModule} from'@angular/platform-browser/animations'
import { ApiInterceptor } from './interceptor/api.interceptor';
import { NgChartsModule } from 'ng2-charts';
import { MatInputModule } from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    NgChartsModule,
    MatButtonModule
   
  ],
  exports:[],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:ApiInterceptor,multi:true
  },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
