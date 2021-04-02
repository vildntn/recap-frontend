import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
   carAddForm:FormGroup;
   brands:Brand[];
   colors:Color[];
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService
    ) { }

  ngOnInit(): void {
    this.getBrands(),
    this.getColors(),
    this.createCarAddForm()
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
     brandId:["",Validators.required],
     colorId:["",Validators.required],
     modelYear:["",Validators.required],
     dailyPrice:["",Validators.required],
     description:["",Validators.required],
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
 }
 getColors(){
  this.colorService.getColors().subscribe(response=>{
    this.colors=response.data
  })
}
 addCar(){
   if(this.carAddForm.valid){
     let carModel=Object.assign({},this.carAddForm.value)
     console.log(carModel)
     this.carService.addCar(carModel).subscribe((response)=>{
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
