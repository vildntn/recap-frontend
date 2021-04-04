import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44369/api/colors/";
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath)

  }
  getColorsByColorId(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath=this.apiUrl+"getbyid?id="+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath)

  }
  addColors(color:Color):Observable<SingleResponseModel<Color>>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<SingleResponseModel<Color>>(newPath,color)
  }
  updateColors(color:Color):Observable<SingleResponseModel<Color>>{
    let newPath=this.apiUrl+"update";
    return this.httpClient.post<SingleResponseModel<Color>>(newPath,color)
  }
  deleteColors(color:Color):Observable<SingleResponseModel<Color>>{
    let newPath=this.apiUrl+"delete";
    return this.httpClient.post<SingleResponseModel<Color>>(newPath,color)
  }
}

