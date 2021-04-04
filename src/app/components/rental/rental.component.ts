import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  
  rentals:Rental[]=[];
  customers:Customer[]=[];
  rentalAddForm:FormGroup;
  rentDateFilter:Date;
  customerIdFilter:number;
  returnDateFilter:Date;
  @Input() car: Car;


  
  constructor(private rentalService:RentalService, 
    private toastrService:ToastrService,
    private router:Router,
    private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomer()
  }
  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      console.log(response.data);
    });
  }

  getRentals(){
    let newrental:Rental={
      carId:this.car.carId,
      brandName:this.car.brandName,
      colorName:this.car.colorName,
      rentDate:this.rentDateFilter,
      returnDate:this.returnDateFilter,
      customerId: parseInt(this.customerIdFilter.toString()),
    }
     this.rentalService.checkIfCarUsage(newrental).subscribe(
       (response)=>{
        console.log(response.message);
       this.toastrService.success(response.message, this.car.brandName);
    
     this.router.navigate(['/payment', JSON.stringify(newrental)]);
    },
    (error) => {
      this.toastrService.error('The car cannot be rented on the requested dates.','Kiralama Başarısız');
      this.router.navigate(['/cars', JSON.stringify(newrental)]);
    })
    
  }

 

}
