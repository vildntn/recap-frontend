import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentUser } from 'src/app/models/currentUser';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

import { LocalStorageService } from 'src/app/services/local-storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm:FormGroup;
   returnUrl:string;
  
   user:User;
   currentUser:CurrentUser;


  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute,
    private localStorageServis:LocalStorageService,
    private customerService:CustomerService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.login();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


createLoginForm(){
  this.loginForm=this.formBuilder.group({
    email:["", Validators.required],
    password:["", Validators.required]
  })
}


login(){
  if(this.loginForm.valid){
     let loginModel=Object.assign({}, this.loginForm.value)
     this.authService.login(loginModel).subscribe(response=>{
       //console.log(response)
       this.toastrService.info(response.message,"Success")
       this.router.navigateByUrl(this.returnUrl); //when login successful, redirect to returnUrl
      this.localStorageServis.setToken(response.data.token)
      console.log(this.localStorageServis.currentUser.username)
      this.localStorageServis.getUserInformation()




     // console.log(this.localStorageServis.getItem())
      // console.log(this.authService.getUserInformation(this.currentUser))

      // localStorage.setItem("currentUser",JSON.stringify(loginModel.email))
       //console.log(localStorage.getItem("user"))
     },responseError=>{
       this.toastrService.error(responseError.error)
     })
  }

}
}
