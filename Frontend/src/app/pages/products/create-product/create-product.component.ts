import { Component } from '@angular/core';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { addProductModel } from './create-product.model';
import { UserService } from '@app/_services/user.service';
import { SnackbarService } from '@app/_services/snackbar.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { AuthenticationService } from '@app/_services/authentication.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],

})
export class CreateProductComponent {
  loading = false;
  productCategories = [
    "Electronics",
    "Clothing & Fashion",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Health & Wellness",
    "Baby & Kids",
    "Books, Movies & Music",
    "Automotive",
    "Sports & Outdoors",
    "Jewelry & Watches",
    "Pet Supplies",
    "Office & School Supplies",
    "Home Improvement",
    "Furniture & Decor",
    "Grocery & Gourmet Food",
    "Industrial & Scientific",
    "Electronics Accessories",
    "Arts & Crafts",
    "Other"
  ];

  productForm: FormGroup

  constructor(
    private formBuilder: RxFormBuilder,
    private userService: UserService,
    private snackbar: SnackbarService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private socket: Socket
  ) { }

  ngOnInit(): void {
    this.socket.on('newProductAdded', (product: any) => {
      // Handle the new product update, e.g., update the UI
      console.log('New product added:', product);
    });
    this.productForm = this.formBuilder.formGroup(new addProductModel())

    this.productForm.patchValue({

      active: false,
    })

  }


  get productControls() {
    return this.productForm.controls
  }
  validation(key: string) {
    var z: any = this.productControls[key]
    return z._errorMessages
  }

  submit() {

    // stop here if form is invalid
    if (this.productForm.invalid) {
      this.snackbar.error('Validation Error');
      return;
    }

    this.loading = true
    console.log("this.productForm", this.productForm.value)
    this.userService.addProduct(this.productForm.value, this.authenticationService.socketId).subscribe({
      complete: () => {
        this.snackbar.success('Product added successfully');
        this.router.navigate(['/pages/products']);
      },
      error: error => {
        console.log("error: " + error)
        this.snackbar.error('Error: ' + error);
        // this.error = error;
        this.loading = false;
      }
    });
  }
}
