import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  constructor( private activatedRoute:ActivatedRoute,private carDetailService:CarDetailService, private carImageService:CarImageService) {}

  carDetails:CarDetailDto[];

  carImages:CarImage[]=[];
  imageUrl="https://localhost:44369/"


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
        this.getCarImages(params["carId"])
      }
    })
  }

 
  getCarDetailsByCarId(carId:number){
    this.carDetailService.getCarsByCarId(carId).subscribe(response=>{
      this.carDetails=response.data;
    })
 }
 getCarImages(carId:number){
  this.carImageService.getCarImagesById(carId).subscribe(response=>{
    this.carImages=response.data;
  })
}
getCarImage(car:CarDetailDto){

  if(car.imagePath){
    return car.imagePath
  }
  else{
    return 'CarImages/rentacars.jpg'
  }
}
}
