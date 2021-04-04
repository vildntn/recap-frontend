import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {
  dataLoaded=false;
  colorAddForm:FormGroup;
  colorUpdateForm:FormGroup;
  colorId:number
  colors:Color[];
  currentColor:Color;
  constructor(
    private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getColorList();
    //console.log(this.getColorList())
    this.createColorAddForm();

  }

  

  getColorList() {
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.dataLoaded = response.success;
      
    })
  }
  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  




  addColor(){
    if(this.colorAddForm.valid){
      let colorAddModel=Object.assign({},this.colorAddForm.value)
      this.colorService.addColors(colorAddModel).subscribe(
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
