import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentUser } from 'src/app/models/currentUser';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";



@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  currentUser:CurrentUser=this.localStorageService.getUserInformation();
  helper=new JwtHelperService;
  id=this.currentUser.userId;

 
  constructor(
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
 
  }

  getUserName():string{
   return this.currentUser.username;
  }



 isLoggedIn(){
    return this.localStorageService.loggedIn();
 }


 
  logout(){
    this.localStorageService.logout();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  
  }
  

 

}
