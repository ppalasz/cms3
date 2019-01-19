import { Injectable } from '@angular/core';
import { ConfigFields } from './ConfigFields';

declare function require(url: string);

export class ConfigReaderService {
  public response:ConfigFields;

  constructor() {

    this.response=this.getJSON();
}
  private url:string

  

  public getJSON():ConfigFields {

    const content:ConfigFields = require('../config/config.json');

    console.log(content.apiBaseUrl);

    return(content);
  }
}

