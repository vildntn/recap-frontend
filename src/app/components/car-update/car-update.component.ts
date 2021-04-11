import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
 currentCar: Car;
 brands:Brand[];
 colors:Color[];
 carId:number;
 carUpdateForm:FormGroup;
  constructor(
    private carService:CarService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
     this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.carId=(params["carId"]);
        this.getCarDetails(params["carId"])
        this.createCarUpdateForm(this.carId),
        this.getBrands(),
        this.getColors()
      }
    })
    
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
      //console.log(response.data)
    })
 }
 getColors(){
  this.colorService.getColors().subscribe(response=>{
    this.colors=response.data
  })
}

  
  createCarUpdateForm(carId:number){
    this.carUpdateForm=this.formBuilder.group({
     brandId:["",Validators.required],
     colorId:["",Validators.required],
     modelYear:["",Validators.required],
     dailyPrice:["",Validators.required],
     description:["",Validators.required],
     minFindexScore:["",Validators.required]
    })
  }

  getCarDetails(carId:number){
     this.carService.getCarDetailsByCarId(carId).subscribe((response)=>{
       this.currentCar=response.data;
       console.log(this.currentCar)
      // console.log("aaaaaa")
     })
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      let carModel=Object.assign({},this.carUpdateForm.value)
      carModel.carId=parseInt(this.carId.toString());
      //console.log(carModel)
      this.carService.updateCar(carModel).subscribe((response)=>{
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
