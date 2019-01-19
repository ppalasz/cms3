import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms'
import { FormGroup , FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AdminSecurityService } from '../admin-security.service';
import { HttpResponse } from '../../security/HttpResponse';
import { LoginResponse } from '../../security/LoginResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {  

  
  constructor(private formBuilder: FormBuilder,
    private adminSecurityService: AdminSecurityService, 
    private router: Router) 
  { 
    
  }


  ngOnInit() {
    this.form.valueChanges.subscribe();

    if(this.adminSecurityService.id_user>0)
    {
      this.adminSecurityService.Redirect2Admin();
    }
  }
   
  message:string;

  response:LoginResponse;
  result:string="";

  form = this.formBuilder.group({
    username: ['',[Validators.minLength(5), Validators.required ]],
    password: ['',[Validators.minLength(5),Validators.required]]
  })

  login(username, password)
  {      
      this.adminSecurityService.login(username, password).then((resp)=>{
        console.log(resp);
        this.response = new LoginResponse();
        
        let respJson=resp.json();
        this.response = <LoginResponse>respJson;          

        //console.log(this.response);
        //console.log(this.response.id_user);

        if(this.response.id_user>0)
        {     
            this.message = this.response.message;

            this.adminSecurityService.setLoginData(this.response);

            this.adminSecurityService.Redirect2Admin();
        }
    });    
      
  }

  

  submit()
  {
    //console.log(this.form.value);
  }


}
