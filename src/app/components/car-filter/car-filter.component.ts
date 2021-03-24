import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Customer } from 'src/app/models/customer';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands:Brand[]=[];
  colors:Color[]=[];
  customers:Customer[]=[]
  brandIdFilter:number;
  colorIdFilter:number;
  constructor(private brandService:BrandService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }


  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
      //console.log(response.data)
    })
  }


  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      console.log(response.data)
    })
  }

  selectedBrand(brandId:number){
    if(this.brandIdFilter==brandId){
      return true;
    }else{
      return false;
    }
  }

  selectedColor(colorId:number){
    if(this.colorIdFilter==colorId){
      return true;
    }else{
      return false;
    }
  }
}
