import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@app/_services/snackbar.service';
import { UserService } from '@app/_services/user.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { addProductModel } from '../create-product/create-product.model';
import { Product } from '@app/_models/addProductResponse';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Input() disableForm : boolean = false;
  ptitle = 'Edit Product';
  productId: string;
  loading = false;
  error: string;
  constructor(private route: ActivatedRoute, private userService: UserService, private cdf: ChangeDetectorRef, private snackbar: SnackbarService,
    private formBuilder: RxFormBuilder,
    private router: Router,
  ) { }

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
    this.userService.updateProduct(this.productForm.value,this.productId).subscribe({
      complete: () => {
        this.snackbar.success('Product updated successfully');
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
  
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.productId);

    this.getProductById(this.productId)
    this.productForm = this.formBuilder.formGroup(new addProductModel())
   if(this.disableForm){
    this.productForm.disable()
    this.ptitle = 'View Product'
   }
    this.productForm.patchValue({
      active: false
    });
   

  }

  getProductById(id: string) {
    this.error = '';
    this.loading = true;
    this.userService.getProductById(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          let productData = res.data
          this.productForm.patchValue({
            category: productData.category,
            name: productData.name,
            active: productData.active,
            description: productData.description,
            sku: productData.sku,
            barcode: productData.barcode,
            brand: productData.brand,
            stock: productData.stock,
            cost: productData.cost,
            taxPercent: productData.taxPercent,
            price: productData.price,

          })
        },
        // next: () => {
        //   console.log("Completed")
        //   this.loading = false;
        //   this.cdf.detectChanges()
        // },
        error: error => {
          this.error = error;
          this.snackbar.error('Error: ' + error);
          this.loading = false;
        }
      });
  }
}
