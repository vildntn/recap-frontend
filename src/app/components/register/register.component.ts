import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  returnUrl:string;

  constructor(
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private localStorageService:LocalStorageService

  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

   createRegisterForm(){
     this.registerForm=this.formBuilder.group({
       firstName:["",Validators.required],
       lastName:["", Validators.required],
       email:["",Validators.required],
       password:["",Validators.required]
     })
   }
  register(){
    if(this.registerForm.valid){
      let loginModel=Object.assign({}, this.registerForm.value)
      this.authService.register(loginModel).subscribe(response=>{
        //console.log(response)
        this.toastrService.info(response.message,"Success")
        this.localStorageService.setToken(response.data.token)
        this.router.navigateByUrl(this.returnUrl); //when register successful, redirect to returnUrl
        setTimeout(() => {
         window.location.reload();
       }, 1000);
      },responseError=>{
        this.toastrService.error(responseError.error)
    
      })
   }
  }
}
