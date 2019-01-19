import { Component, OnInit } from '@angular/core';
import { AdminSecurityService } from '../admin-security.service';
import { LoginResponse } from '../../security/LoginResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-logout',
  templateUrl: './admin-logout.component.html',
  styleUrls: ['./admin-logout.component.css']
})
export class AdminLogoutComponent implements OnInit {

  constructor(protected adminSecurityService: AdminSecurityService, private router: Router) { }

  ngOnInit() {

    if (!(this.adminSecurityService.id_user > 0)) 
    {
      this.redirectAdmin();
    } 
    else 
    {
      this.message = "wylogowywanie...";
      this.logout();

      setTimeout(() => {
        this.redirectAdmin();
          }, 500);
    }
  }  

  message:string;
  
  logout()
  {    
    this.adminSecurityService.logout();    

    
  }

  
  redirectAdmin()
  {    
    window.location.href = window.location.origin;
  }
  
}
