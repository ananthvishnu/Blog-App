import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {  HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup' ;
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateBlogComponent } from './models/create-blog/create-blog.component';
import { DeleteBlogComponent } from './models/delete-blog/delete-blog.component';
import { authInterceptor } from './interceptor/auth.interceptor';
import { AllBlogsComponent } from './components/all-blogs/all-blogs.component';
import { PageComponent } from './admin/page/page.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { DashCountComponent } from './admin/dash-count/dash-count.component';
import { SalesChartComponent } from './admin/sales-chart/sales-chart.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    CreateBlogComponent,
    DeleteBlogComponent,
    AllBlogsComponent,
    PageComponent,
    SidebarComponent,
    AdminNavComponent,
    DashCountComponent,
    SalesChartComponent,
    SingleBlogComponent,
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgToastModule,
    MatDialogModule

  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
