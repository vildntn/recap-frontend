import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44369/api/customers/";
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl+"getcustomerdetail"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)

  }
  getUserByMail(email:string):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"getbymail?email="+email
    return this.httpClient.get<SingleResponseModel<User>>(newPath)

  }

  getUsers(id:number):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  getCustGetCustomerDetailById(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath=this.apiUrl+"getcustomerdetailsbyid?userId="+userId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }
}
