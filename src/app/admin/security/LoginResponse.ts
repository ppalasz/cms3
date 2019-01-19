import { HttpResponse } from './HttpResponse';

export class LoginResponse extends HttpResponse {
  public id_user: number;
  public userName:string;
  public minutesLeft: number ;
}