import { Component, OnInit, Input, Output } from '@angular/core';
import { AdminSecurityService } from '../security/admin-security.service';
import { Router, Event, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { LoginResponse } from '../security/LoginResponse';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

    @Input()
    public isLogged : boolean  = false;

  constructor(protected adminSecurityService: AdminSecurityService, protected router: Router) {
      
      setInterval(() => {
          if(this.adminSecurityService.isLogged())
          {
                this.checkLogin(false);
          }
      }, 10000);

      router.events.subscribe( (event: Event) => {


        if (event instanceof NavigationStart) {

           // console.log("go to "+event.url);
                       
        }

        if (event instanceof NavigationEnd) {
            //console.log(event.urlAfterRedirects);
            this.checkLogin(true);
        }

        if (event instanceof NavigationError) {
            // Hide loading indicator

            // Present error to user
            console.log(event.error);
        }
    });
   }

   

    

  ngOnInit() {

    this.redirectAll(); 
    this.checkLogin(true);  
    
  }

  

  checkLogin(refresh:boolean)
  {     
        this.adminSecurityService.checkLogin(refresh);           
        
        this.redirectAll();

  }

  private redirectAll()
  {

    if(!this.adminSecurityService.isLogged())
    {
        if(!this.isLoginPage())
        {
            this.adminSecurityService.Redirect2Login();
        }
    }
    else
    {
        this.adminSecurityService.Redirect2Admin();         
    }  
  }
  ////////////////////////////////////
  isLoginPage():boolean
  {
      
        if(this.router.url.indexOf("admin/login")>=0)
        {
            //console.log(this.router.url);
            return(true);
        }
        return(false);
  }



}
