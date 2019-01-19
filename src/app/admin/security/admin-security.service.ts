import { Injectable, Output } from '@angular/core';
import { LoginResponse } from './LoginResponse';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ConfigReaderService } from '../config-reader.service';

@Injectable({
  providedIn: 'root'
})

export class AdminSecurityService {
   
   
    http:HttpService;        
  
    constructor(http: HttpService, private router: Router, private configReader: ConfigReaderService) { 
            this.http = http;

            this.www = configReader.response.apiBaseUrl

   }

   public id_user:number;
   public userName:string;
   public token:string;
   public readonly www:string = ""; 
   public minutesLeft:number;
   
   public login(username, password) {

        let url = this.www + "api/admin/login.php";                 

        return this.http.post(url, 
            {
                username, 
                password
            }
        ).toPromise();          
    }    

    public setLoginData(response:LoginResponse)
    {
        this.id_user = response.id_user;
        this.token = response.token;
        this.userName = response.userName;
        this.minutesLeft = response.minutesLeft;
    }

     

    public cleanLoginData()
    {
        this.id_user = null;
        this.token = null;
        this.userName = null;
    }


    
    private logout2(token, id_user) {

        let url = this.www + "api/admin/logout.php";           

        return this.http.post(url, 
            {
                token,
                id_user
            }
        ).toPromise();          
    } 

    public logout() {
        
        this.cleanLoginData();        
        this.logout2(this.token, this.id_user).then((resp)=>{
      
       let respJson=resp.json();
       let response = <LoginResponse>respJson;          

       console.log(response);
       console.log(response.id_user);        
     });
     
    }

    public isLogged():boolean
    {
        if ((this.id_user > 0) && (this.minutesLeft > 10)) 
        {
            return(true);
        }
        else
        {
            return(false);
        }
    }

  private checkLogin2(refresh:boolean)
  {            
    let url=this.www + "api/admin/check_login.php";
    //console.log('check_login');
      
    let response:LoginResponse=new LoginResponse();
    let token = this.token;
    let id_user= this.id_user;

    return this.http.post(url,
    {
        token, 
        id_user,
        refresh
    }).toPromise();   
  }
  

  public checkLogin(refresh:boolean):LoginResponse
  {
    let response = new LoginResponse();
        this.checkLogin2(refresh).then((resp)=>{

        let respJson=resp.json();
        response = <LoginResponse>respJson;  
        //console.log(response);        

        this.setLoginData(response);          
        
    });
    return(response);
  }

  
  public Redirect2LoginIfNotLogged()
  {
        if (!this.isLogged()) 
        {
        this.Redirect2Login();
        }
  }  
  
    public Redirect2Login(): any  {

        this.router.navigate(['/admin/login']);
    }

    public Redirect2Admin(): any {

        this.router.navigate(['/admin']);
    }

}
