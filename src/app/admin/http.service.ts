import { Injectable, Output } from '@angular/core';
import { Headers, Http, Request, RequestOptions,RequestMethod, Response, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigFields } from './ConfigFields';
import { ConfigReaderService } from './config-reader.service';

@Injectable() 
export class HttpService extends Http {  

  apiBaseUrl:string;
  withCredentials:boolean;

  constructor(backend: XHRBackend, options: RequestOptions, private configReader: ConfigReaderService) {
    super(backend, options);

    this.apiBaseUrl = configReader.response.apiBaseUrl;   
    let origin = window.location.origin + "/";
    console.log(origin);
    console.log(this.apiBaseUrl);

    this.withCredentials = (origin.indexOf(this.apiBaseUrl)>=0);
    console.log(this.withCredentials);
   }

   
   post(url: string, body?: any, options?: any): Observable<Response> {
        
        options = {headers: new Headers({ 'Content-Type': 'application/json' })};
        options.method = RequestMethod.Post;        
        options.withCredentials = this.withCredentials;
        options.origin = window.location.origin;//'http://localhost:4200' 
 
        return super.post(url, body, options);
    }

  get(url: string, options?: any): Observable<Response> {
        
        options = {headers: new Headers({ 'Content-Type': 'application/json' })};
        options.method = RequestMethod.Get;        
        options.withCredentials = true;
        //options.origin = 'http://localhost:4200' 

        return super.get(url, options);
    }

}
