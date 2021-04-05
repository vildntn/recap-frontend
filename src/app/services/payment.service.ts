import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCreditCard } from '../models/fakeCreditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44369/api/";
  constructor(private httpClient:HttpClient) { }

  getCreditCards():Observable<ListResponseModel<FakeCreditCard>>{
    let newPath=this.apiUrl+"fakecreditCard/getall"
    return this.httpClient.get<ListResponseModel<FakeCreditCard>>(this.apiUrl)
  }

  isCreditCardExist(fakecreditCard:FakeCreditCard):Observable<ResponseModel>{
    let newPath=this.apiUrl+"fakecreditCards/iscreditcardexist"
    return this.httpClient.post<ResponseModel>(newPath,fakecreditCard)
  }
}
