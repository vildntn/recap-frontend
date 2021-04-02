import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { FakeCreditCard } from 'src/app/models/fakeCreditCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

 
  rental:Rental;
  NameOnTheCard:"";
  CardNumber:"";
  CardCvv:"";
  ExpirationMonth:"";
  ExpirationYear:"";
  Money:number=0;
  @Input() car: Car;
  carDetails:Car[];
  @Input() fakeCard: FakeCreditCard;

  amount:number = 0;

  constructor(private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private router:Router,
    private toastr: ToastrService, 
    private paymentService:PaymentService

    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
        // this.getCar();
      }
    })
  }

  // getCar(){
  //   this.carService.getCarDetailsByCarid(this.rental.carId).subscribe(response => {
  //    this.car= response.data;
  //    this.totalPayment(); 
  //   })
  // }

  totalPayment(){
    
  }

  //payment test not real payment process
  payment(){
    if(this.rental.returnDate != null )
    {
      let dateRent = new Date(this.rental.returnDate.toString());
      let dateReturn = new Date(this.rental.rentDate.toString());

      let difference = (dateRent.getTime() - dateReturn.getTime());
      let numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      this.Money = numberOfDays * (this.car.dailyPrice + ( this.car.dailyPrice * 8 / 100));
      let newCard:FakeCreditCard={
        nameOnTheCard:this.NameOnTheCard,
        id:this.fakeCard.id,
        expirationMonth:this.ExpirationMonth,
        expirationYear:this.ExpirationYear,
        money:this.Money,
        cardCvv:this.CardCvv,
        cardNumber:this.CardNumber
  
      }
      this.paymentService.addCreditCard(newCard).subscribe(response => {
        this.toastr.success("Payment Successfully");
      
      })
      if(this.amount <= 0)
      {
         this.router.navigate(['/cars']);
         this.toastr.error("Payment Error");
      }
    }
    
   
    
   
  }
}
