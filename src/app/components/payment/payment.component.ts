import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validator, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { FakeCreditCard } from 'src/app/models/fakeCreditCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentAddForm:FormGroup
  rental:Rental;
  carId:number;
  car:Car
  Money:number=0;
  carDetails:Car[];
  @Input() fakeCard: FakeCreditCard;

  amount:number = 0;

  constructor(private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private formBuilder:FormBuilder,
    private router:Router,
    private toastr: ToastrService, 
    private paymentService:PaymentService,
    private rentalService:RentalService

    ) { }

  ngOnInit(): void {
    this.createPaymentForm()
    this.activatedRoute.params.subscribe(params=>{
      if(params["rent"]){
        this.rental = JSON.parse(params['rent']);
        this.carId=this.rental.carId;
        // this.getCar(this.carId);
        
       

      }
    })
  }

 

   createPaymentForm(){
     this.paymentAddForm=this.formBuilder.group({
       nameOnTheCard:["",Validators.required],
       cardNumber:["",Validators.required],
       expirationYear:["",Validators.required],
       expirationMonth:["",Validators.required],
       cardCvv:["",Validators.required]
     })
   }
   addcreditCard(){
     if(this.paymentAddForm.valid){
       let creditCardModel=Object.assign({amount: this.car.dailyPrice},this.paymentAddForm.value);
       this.paymentService.addCreditCard(creditCardModel).subscribe((response)=>{
        this.toastr.success(response.message,"Successful");
        this.router.navigate([""]);
       },(responseError)=>{
        this.toastr.success(responseError.error.message,"Successful");
       })
     } else{
      this.toastr.warning("Missing Form","Attention");
    }
   }
 
   addPayment(){
     if(this.paymentAddForm.valid){
       let paymentModel=Object.assign({ amount: this.car.dailyPrice },this.paymentAddForm.value);
       //console.log(this.amount)
       this.paymentService.isCreditCardExist(paymentModel).subscribe(
        (creditCardExistResponse) => {
          this.toastr.success(creditCardExistResponse.message)
          this.paymentService.addCreditCard(paymentModel).subscribe((addCreditCardResponse)=>{
            this.toastr.success(addCreditCardResponse.message)
          },(addCreditCardResponseError)=>{

          })
          this.rentalService.addRental(this.rental).subscribe(addRentalResponse=>{
             this.toastr.success(addRentalResponse.message)
          })
          this.toastr.success(creditCardExistResponse.message,"Successful");
          setTimeout(() => {
            this.router.navigate([""]);
          }, 3000);
        
       
        },
        (creditCardNotExistResponseError) => {
          console.log(creditCardNotExistResponseError);
          this.toastr.error(creditCardNotExistResponseError.error.message,"Attention")
          if(creditCardNotExistResponseError.error.ValidationErrors.length>0){
            for (let i = 0; i < creditCardNotExistResponseError.error.ValidationErrors.length; i++) {
              this.toastr.error(creditCardNotExistResponseError.error.ValidationErrors[i].ErrorMessage,"Validation Error");
            }
          }
        }
  
      );
    }
    else{
      this.toastr.warning("Missing Form","Attention");
    }
  }

  // getTotalPrice() {
  //   if (this.rental.returnDate != null) {
  //     let dateRent = new Date(this.rental.returnDate.toString());
  //     let dateReturn = new Date(this.rental.rentDate.toString());
  //     let difference = (dateRent.getTime() - dateReturn.getTime());
  //     let differenceOfDays = Math.ceil(difference / (1000 * 3600 * 24));
  //     if (differenceOfDays == 0) {
  //       differenceOfDays = 1;
  //     }
  //     this.amount = differenceOfDays * (this.car.dailyPrice + (this.car.dailyPrice * 8 / 100)); 
  //     //calculate with VAT
  //   }
  // }
  // getCar(carId:number) {
  //   this.carService.getCarDetailsByCarId(carId).subscribe(response => {
  //     this.car = response.data;
  //     //console.log(this.car.dailyPrice)
  //     this.getTotalPrice();
  //   })
  // }
  
  
}
