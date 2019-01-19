import { Component, OnInit } from '@angular/core';
import { AdminSecurityService } from '../security/admin-security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sql',
  templateUrl: './admin-sql.component.html',
  styleUrls: ['./admin-sql.component.css']
})
export class AdminSqlComponent implements OnInit {

    constructor(protected adminSecurityService: AdminSecurityService, private router: Router) { }
  
    ngOnInit() {  
      this.adminSecurityService.Redirect2LoginIfNotLogged();    
    }  

}
