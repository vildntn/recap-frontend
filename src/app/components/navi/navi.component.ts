import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentUser } from 'src/app/models/currentUser';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  currentUser:CurrentUser;
  helper=new JwtHelperService;

 
  constructor(
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
 
  }

  getUserName():string{
   return this.localStorageService.getItem("currentUser")
  }

 userId=this.localStorageService.currentUser.nameid;


 

 isLoggedIn(){
     if(this.localStorageService.getItem("token")){
       return true;
     }else{return false;}
 }


 
  logout(){
    this.localStorageService.logout();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  
  }
  

 

}
