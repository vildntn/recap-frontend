import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44369/api/cars/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+"getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }
  getCarDetailsByCarId(carId:number):Observable<SingleResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+"getcardetailsbycarid?carId="+carId
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newPath)
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+"getcarsbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+"getcarsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }
   getCarsByBrandAndColor(colorId:number,brandId:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+"cars/getcardetailsbybrandandcolor?brandId=+"+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
   }

   addCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,car)
   }

   deleteCar(car:Car):Observable<ResponseModel>{
     let newPath=this.apiUrl+"delete"
     return this.httpClient.post<ResponseModel>(newPath,car)
   }
   updateCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
  getCarDetailsByCarid(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcardetailsbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
