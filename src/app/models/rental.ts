export interface Rental{
    carId:number,
    customerId:number,
    brandName:string,
    colorName:string,
    rentDate:Date,
    returnDate?:Date;
}