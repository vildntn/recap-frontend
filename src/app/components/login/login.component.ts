import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm:FormGroup;
   returnUrl:string;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute
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
       localStorage.setItem("token",response.data.token)
     },responseError=>{
       this.toastrService.error(responseError.error)
     })
  }
}
}
