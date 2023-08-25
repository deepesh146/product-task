import { AbstractControl } from "@angular/forms";
import { required, compare, alpha, minLength, email, numeric, disable, prop, propObject, oneOf, date } from "@rxweb/reactive-form-validators";

export class addProductModel {

    @required()
    category: string

    @required()
    name: string;

    @required()
    active: boolean;
    
    @required()
    description: string;

    @required()
    sku: string;

    @required()
    barcode: string;

    @prop()
    @required()
    brand: string;

    @numeric({ message: "Only numbers are allowed" })
    stock: string;

    @numeric({ message: "Only numbers are allowed" })
    cost: string;

    @numeric({ message: "Only numbers are allowed" })
    taxPercent: string;

    @numeric({ message: "Only numbers are allowed" })
    price: string;

 


}