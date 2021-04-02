import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  currentBrand:Brand;
  brandId:number;
  brandUpdateForm:FormGroup;
   constructor(
     private toastrService:ToastrService,
     private formBuilder:FormBuilder,
     private brandService:BrandService,
     private activatedRoute:ActivatedRoute,
   ) { }
 
   ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
       if(params["brandId"]){
         this.brandId=(params["brandId"]);
         this.getBrandDetails(params["brandId"])
         this.createBrandUpdateForm(this.brandId)
        console.log(this.brandId);
       }
     })
     
   }


   
   createBrandUpdateForm(brandId:number){
     this.brandUpdateForm=this.formBuilder.group({
      brandName:["",Validators.required],
      brandId:[this.brandId,Validators.required],
     })
   }
 
   getBrandDetails(brandId:number){
      this.brandService.getBrandsByBrandId(brandId).subscribe((response)=>{
        this.currentBrand=response.data;
        console.log(this.currentBrand)
       // console.log("aaaaaa")
      })
   }
 
   updateBrand(){
     if(this.brandUpdateForm.valid){
       let brandModel=Object.assign({},this.brandUpdateForm.value)
       brandModel.brandId=parseInt(this.brandId.toString());
       //console.log(brandModel)
       this.brandService.updateBrands(brandModel).subscribe((response)=>{
        this.toastrService.success(response.message,"Successful");
       },(responseError)=>{
         if(responseError.error.ValidationErrors.length>0){
          console.log(responseError.error.ValidationErrors)
           for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error"); 
           }
         }
      })
     }
     else{
      this.toastrService.error("Missing Form","Attention");
     }
   }
 
}
