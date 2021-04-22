import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule ,ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterBrandPipePipe } from './pipes/filter-brand-pipe.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';

import {ToastrModule} from 'ngx-toastr';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NaviComponent,
    CarComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    FilterBrandPipePipe,
    FilterColorPipePipe,
    PaymentComponent,
    CarFilterComponent,
    CarAddComponent,
    ColorAddComponent,
    CarListComponent,
    CarUpdateComponent,
    BrandListComponent,
    ColorListComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    HomeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })


  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
