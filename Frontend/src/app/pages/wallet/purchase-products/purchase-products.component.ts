import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '@app/_services/snackbar.service';
import { UserService } from '@app/_services/user.service';
import { TopupComponent } from '../topup/topup.component';
import { Result } from '@app/_models/products';
import { Observable, debounceTime, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-purchase-products',
  templateUrl: './purchase-products.component.html',
  styleUrls: ['./purchase-products.component.scss']
})
export class PurchaseProductsComponent {
  topupForm: FormGroup;
  options: any[] = [];

  loading: boolean = false;
  balance: number = 0;

  // search for purchase

  filteredOptions: Observable<Result[]>;
  searchControl = new FormControl();
  quantity = new FormControl();


  constructor(
    public dialogRef: MatDialogRef<TopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackbar: SnackbarService
  ) {
  }
  ngOnInit() {

    // this.getProducts();
    this.topupForm = this.formBuilder.group({
      category: ['', Validators.required],
    });

    // this.filteredOptions = 
    this.searchControl.valueChanges.pipe(startWith(''),
      debounceTime(300)).subscribe(query => {
        this.loading = true;
        // this.filteredOptions =
        this.getProducts(query);
      });


  }

  displayFn(product: any): string {
    console.log("product",product)
    return product ? `${product.name} (${product.barcode})` : '';
  }

  getProducts(query: string) {
    this.loading = true;
    return this.userService.getAll({
      sortBy: 'DESC',
      page: '1',
      limit: '10',
      search: query ? query : ''
    }).subscribe({
      next: (data) => {
        // get return url from route parameters or default to '/'
        console.log("data in successfully", data)
        this.options = data.data.results

        this.loading = false;
        return this.options
      },
      error: error => {
        console.log("error: " + error)
        this.snackbar.error('Error: ' + error);
        this.loading = false;
      }
    });
  }
  submit() {
    this.loading = true;
    if(!this.searchControl.value?.barcode || !this.quantity.value){
      this.snackbar.error('Error: Validation failed');
      return false;
    }
    console.log("this.searchControl.value",this.searchControl.value)
    return this.userService.purchase({
      barcode : this.searchControl.value.barcode,
      quantity : this.quantity.value
    }).subscribe({
      next: (data) => {
        // get return url from route parameters or default to '/'
        console.log("data in successfully", data)
        this.snackbar.success("Purchased successfully")
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: error => {
        console.log("error: " + error)
        this.snackbar.error('Error: ' + error);
        this.loading = false;
      }
    });
  }

}


