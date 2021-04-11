import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators  } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm:FormGroup;
  userId:number;
  users:User;

  constructor(private formBuilder:FormBuilder,
    private localStorageService:LocalStorageService,
    private activatedRoute:ActivatedRoute,
    private customerService:CustomerService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.userId=(params["id"]);
        this.createUserProfileForm(this.userId);
 
      }
    })
 
  }
  getUsersByUserId(id:number){
    this.customerService.getUsers(id).subscribe(response=>{
      this.users=response.data;
    })
 }

  createUserProfileForm(userId:number){
    this.userProfileForm=this.formBuilder.group({
      userId:[this.userId,Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required]
    })
  }

  getUserInformation()
  {
    if(this.userProfileForm.valid){
       let userProfileModel=Object.assign({},this.userProfileForm.value)
       userProfileModel.userId=parseInt(this.userId.toString());
       //console.log(brandModel)
       this.customerService.getUsers(userProfileModel).subscribe((response)=>{
        this.toastrService.success(response.message,"Successful");
       },(responseError)=>{
         if(responseError.error.ValidationErrors.length>0){
          console.log(responseError.error.ValidationErrors)
           for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error"); 
           }
         }
      })
     }
     else{
      this.toastrService.error("Missing Form","Attention");
     }
   }
 
  }

