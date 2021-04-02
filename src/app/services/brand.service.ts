import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';

import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl="https://localhost:44369/api/brands/";
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }
  getBrandsByBrandId(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath=this.apiUrl+"getbyid?id"+brandId
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath)
  }

  updateBrands(brand:Brand):Observable<SingleResponseModel<Brand>>{
    let newPath=this.apiUrl+"update"
    return this.httpClient.post<SingleResponseModel<Brand>>(newPath,brand)
  }

  AddBrands(brand:Brand):Observable<SingleResponseModel<Brand>>{
    let newPath=this.apiUrl+"add"
    return this.httpClient.post<SingleResponseModel<Brand>>(newPath,brand)
  }
  
}
