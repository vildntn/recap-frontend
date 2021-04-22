import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators  } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
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
  customers:Customer

  constructor(private formBuilder:FormBuilder,
    private localStorageService:LocalStorageService,
    private activatedRoute:ActivatedRoute,
    private customerService:CustomerService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.userId=(params["id"]);
        console.log(this.userId)
        this.createUserProfileForm(this.userId);
        this.getUsersByUserId(this.userId)
 
      }
    })
 
  }
  getUsersByUserId(userId:number){
    this.customerService.getCustGetCustomerDetailById(this.userId).subscribe(response=>{
      this.customers=response.data;
    //   this.userProfileForm.setValue({
    //      firstName:this.customers.firstName,
    //      lastName:this.customers.lastName,
    //      email:this.customers.email
    //   });
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
      //userProfileModel.userId=parseInt(this.userId.toString());
      // console.log(userProfileModel.userId)
       this.customerService.getCustGetCustomerDetailById(this.userId).subscribe((response)=>{
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

