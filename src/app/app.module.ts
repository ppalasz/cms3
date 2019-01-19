import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin/security/admin-login/admin-login.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminStartComponent } from './admin/admin-start/admin-start.component';
import { Url404Component } from './url404/url404.component';
import { AdminLogoutComponent } from './admin/security/admin-logout/admin-logout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminSecurityService } from './admin/security/admin-security.service';
import { ConfigReaderService } from './admin/config-reader.service';
import { HttpService } from './admin/http.service';
import { AdminSqlComponent } from './admin/admin-sql/admin-sql.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full'} ,
  { path: 'admin', 
    children: [      
      { path: 'start' , component: AdminStartComponent },
      { path: 'login' , component: AdminLoginComponent }, 
      { path: 'logout', component: AdminLogoutComponent }, 
      { path: 'sql', component: AdminSqlComponent }, 
      { path: ''      , component: AdminPanelComponent },
    ]},  
  {path: 'url404', component: Url404Component}, 
  { path: '**', redirectTo: '/404', pathMatch: 'full' },

  
]

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminStartComponent,
    Url404Component,
    AdminLogoutComponent,
    AdminPanelComponent,
    AdminSqlComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ HttpService, AdminSecurityService, ConfigReaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
