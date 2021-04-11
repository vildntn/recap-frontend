
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  
  rentals:Rental[];
  customers:Customer[];
  rentalAddForm:FormGroup;
  rentDateFilter:Date;
  customerIdFilter:number;
  returnDateFilter:Date;

  @Input() car: Car;


  
  constructor(private rentalService:RentalService, 
    private toastrService:ToastrService,
    private router:Router,
    private customerService:CustomerService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCustomer();
    this.createRentalAddForm();

  }
  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      console.log(response.data);
    });
  }


  createRentalAddForm(){
    this.rentalAddForm=this.formBuilder.group({
      carId:[this.car.carId,Validators.required],
      customerId:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required]
    })
  }


  addRentals(){
    if(this.rentalAddForm.valid){
      let rentalModel=Object.assign({},this.rentalAddForm.value)
      rentalModel.customerId=parseInt(this.customerIdFilter.toString());
     
      this.rentalService.checkIfCarUsage(rentalModel).subscribe((responses)=>{
        console.log(rentalModel)
        //console.log(this.customerIdFilter)
        console.log(rentalModel.carId)
        this.rentalService.checkIfMinFindexScoreEnough(rentalModel).subscribe((response)=>{
          
          this.toastrService.success();
          this.toastrService.info("You Are Redirected To The Payment Page","Please Wait")
          this.router.navigate(['/payment', JSON.stringify(rentalModel)]);
          this.toastrService.success(responses.message, this.car.brandName);
        },(responseError)=>{
          this.toastrService.error(responseError.error.message,"Attention")
          this.toastrService.info("Redirecting to Homepage","Please Wait");
          setTimeout(() => {
            this.router.navigate([""])
          }, 2000);
         
        })
      },(responsesError)=>{
        
        this.toastrService.error(responsesError.error.message)
        this.toastrService.info("Redirecting to Homepage","Please Wait");
        setTimeout(() => {
          this.router.navigate([""])
        }, 2000);
      })

    }else{
      this.toastrService.error("Missing Form","Attention");
    }
  }
  

 

}
