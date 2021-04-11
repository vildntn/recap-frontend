import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CurrentUser } from '../models/currentUser';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  helper = new JwtHelperService();
  user:string="currentUser";
  currentUser:CurrentUser={
    username:null,
    email:null,
    role:null,
    nameid:null
  };
  constructor() { }

  setToken(token:string){
    localStorage.setItem("token",token)
  }
  getItem(key:any):string{
    let result=localStorage.getItem(key);
    return result;
  }
 
  removeItem(key:any){
     localStorage.removeItem(key)

  }
  setItem(item:string,value:any){
      localStorage.setItem(item,value)
  }
  getUserInformation(){
      
    var decodedToken=this.helper.decodeToken(this.getItem("token"));
    this.currentUser.username=decodedToken.given_name;
    this.currentUser.email=decodedToken.email;
    this.currentUser.nameid=parseInt(decodedToken.nameid.toString());
    this.currentUser.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.helper.isTokenExpired(this.getItem("token"))
    localStorage.setItem("currentUser",this.currentUser.username)

    localStorage.setItem("email",this.currentUser.email)
    return this.currentUser;
   
  }

  loggedIn(){
    let token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }

  logout() {
    this.currentUser = {
      username:null,
      email:null,
      role:null,
      nameid:null
    };
   this.removeItem('token');
   this.removeItem('currentUser')
  }

}
