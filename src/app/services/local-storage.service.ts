import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

import { CurrentUser } from '../models/currentUser';
import { CustomerService } from './customer.service';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  helper = new JwtHelperService();
  token=localStorage.getItem("token");
  //  currentUser:CurrentUser;
  currentUser:CurrentUser={
    username:null,
    email:null,
    role:null,
    userId:null,
    customerId:null
  };
  constructor(private customerService:CustomerService) { }

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
      
    var decodedToken=this.helper.decodeToken(this.getItem('token'));
    if(decodedToken){
      if(this.loggedIn){
        this.currentUser.username=decodedToken.given_name;
        this.currentUser.email=decodedToken.email;
        this.currentUser.userId=parseInt(decodedToken.nameid.toString());
        this.currentUser.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        this.helper.isTokenExpired(this.getItem("token"))
        localStorage.setItem("currentUser",this.currentUser.username)
       
      }   
    }   
    return this.currentUser;
  
  }

  

  loggedIn(){
    if(this.getItem("token")){
      return this.helper.isTokenExpired();
    }else{return false;}
   
  }

  logout() {
    // this.currentUser = {
    //   username:null,
    //   email:null,
    //   role:null,
    //   userId:null
    // };
   this.removeItem('token');
   this.removeItem('currentUser')
  }

}
