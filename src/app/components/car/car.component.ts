import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  dataLoaded:false;
  carImages:CarImage[]=[];

  // carImages:string;
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute, private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"])
      }
        else if(params["colorId"]){
          this.getCarsByColorId(params["colorId"])
        }
      else{
        this.getCars()
        
      }
    })
  }

  getCars(){
     this.carService.getCars().subscribe(response=>{
       this.cars=response.data;
      //  this.setCarImages(this.cars);
       
     })
  }

  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.cars=response.data;
    })
 }

 getCarsByColorId(colorId:number){
  this.carService.getCarsByColorId(colorId).subscribe(response=>{
    this.cars=response.data;
  })
}

getCarImages(){
  this.carImageService.getCarImages().subscribe(response=>{
    this.carImages=response.data;
  })
}

// setCarImages(cars: Car[]){
//   cars.forEach(car => {
//     this.carImageService.getCarImagesById(car.carId).subscribe(response => {
//       car.imagePath = "http://localhost:44369/" + response.data[0].imagePath;
//     })
//    })
//  }


}
