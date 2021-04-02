import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  dataLoaded = false;
  brands : Brand[];
  brandId:number;
  brandAddForm:FormGroup;

  
  constructor(
    private brandService:BrandService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.getBrandList();
    this.createBrandAddForm();
  }

  getBrandList() {
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
      this.dataLoaded = response.success;
    })
  }

  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  addBrand(){
    if(this.brandAddForm.valid){
      let brandAddModel=Object.assign({},this.brandAddForm.value)
      //console.log(brandAddModel)
      this.brandService.AddBrands(brandAddModel).subscribe(
        (response) => {
          this.toastrService.success(response.message,"Successful");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (responseError) => {
          console.log(responseError);
          if(responseError.error.ValidationErrors.length>0){
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error");
            }
          }
        }
      );
    }
    else{
      this.toastrService.warning("Missing Form","Attention");
    }
  }

  

  

  
}