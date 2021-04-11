import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44369/api/";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl)
  }
  checkIfCarUsage(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"rentals/checkifcarusage"
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }

  checkIfMinFindexScoreEnough(rental:Rental):Observable<ResponseModel>{
    //   let newPath=this.apiUrl+"rentals/checkifminfindexscoreenough?customerId="+customerId
    let newPath=this.apiUrl+"rentals/checkifminfindexscoreenough"
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }


  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rental)
    
  }
  
}
