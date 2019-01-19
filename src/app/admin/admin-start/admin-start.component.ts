import { Component, OnInit } from '@angular/core';
import { AdminSecurityService } from '../security/admin-security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-start',
  templateUrl: './admin-start.component.html',
  styleUrls: ['./admin-start.component.css']
})
export class AdminStartComponent implements OnInit {

  constructor(protected adminSecurityService: AdminSecurityService, private router: Router) { }

  ngOnInit() {
    this.adminSecurityService.Redirect2LoginIfNotLogged();      
  }  

}
