import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorId:number;
  colorUpdateForm:FormGroup;
  constructor(
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        this.colorId=(params["colorId"]);
        this.createColorUpdateForm(params["colorId"])
        //console.log(this.colorId);
        
      }
    })
  }
  createColorUpdateForm(colorId:number){
    this.colorUpdateForm=this.formBuilder.group({
      colorId:[this.colorId,Validators.required],
      colorName:["",Validators.required]
    })
 }

 
 updateColor(){
  if(this.colorUpdateForm.valid){
    let colorUpdateModel=Object.assign({},this.colorUpdateForm.value)
    colorUpdateModel.colorId=parseInt(this.colorId.toString());
    this.colorService.updateColors(colorUpdateModel).subscribe(
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
