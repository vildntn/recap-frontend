import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:string="currentUser";

 
  apiUrl="https://localhost:44369/api/auth";
  constructor(private httpClient:HttpClient,
    private localStorageService:LocalStorageService) { }

  login(loginModel:LoginModel){
    let newPath=this.apiUrl+"/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }
  register(registerModel:RegisterModel){
    let newPath=this.apiUrl+"/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }
  
  isAuthentication(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  
  // loggedIn(){
  //  let token=this.localStorageService.getItem();
  //  return !this.helper.isTokenExpired(token)
  // }
//   logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
// }

  
  
  
}
