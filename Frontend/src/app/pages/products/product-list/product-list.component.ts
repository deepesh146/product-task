import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Result } from '@app/_models/products';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { SnackbarService } from '@app/_services/snackbar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() receivedProduct: any;
  displayedColumns = ['id', 'name', 'sku', 'barcode', 'stock', 'price', 'active', 'action'];
  loading = false;
  products?: Result[];
  dataSource!: MatTableDataSource<Result>;
  totalResults!: number;
  // MatTableDataSource<Result>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private cdRef: ChangeDetectorRef, private dialog: MatDialog, private snackbar: SnackbarService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getReceivedProduct().subscribe(productData => {
      if (productData) {
        console.log("getReceivedProduct is called", productData)
        // if (this.currentRoute == '/pages/products') {
        //   var msg = 'A new product has been added & the table is refreshed'

        // } else {
        //   var msg = 'A new product has been added kindly check the dashboard page'
        // }
        // this.snackbar.success("getReceivedProduct changed to " + productData)
        // console.log("getReceivedProduct changed to " + productData)
        // Trigger API call when receivedProduct changes
        this.getAllProducts();
      }
    });
  }

  ngAfterViewInit() {
    console.log('Hello');
    // If the user changes the sort order, reset back to the first page.

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.getAllProducts()

  }

  getAllProducts(search = '') {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          // this.dataSource = <any>[]
          this.cdRef.detectChanges();
          return this.userService.getAll(
            {
              sortBy: `${this.sort.active + ":" + this.sort.direction}`,
              page: this.paginator.pageIndex + 1,
              limit: this.paginator.pageSize,
              search : search
            }
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.loading = false;
          // this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.totalResults = data.data.totalResults
          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          // this.resultsLength = data.total_count;
          console.log(data.data.results)
          return data.data.results;
        })
      )
      .subscribe((data) => {
        console.log("in subscribers: " + data)
        console.log("loading results: " + this.loading)
        this.dataSource = new MatTableDataSource(data)
      })

  }

  applyFilter(event: any) {
    console.log(`applyFilter`, event.target.value);
    var filterValue = event.target.value
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
    this.getAllProducts(filterValue)

  }


  openDialog(itemName: string, productId: string) {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '400px',
      // data: { itemName },
      data: { itemName, heading: "Confirm Delete", title: 'Are you sure you want to delete product ' + itemName + '?', cancelText: 'No', submitText: 'Yes' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Perform the delete operation here
        console.log(`Item "${itemName}" has been deleted`);

        this.loading = true;
        this.userService.deleteProduct(productId).subscribe({
          complete: () => {
            this.snackbar.success('Product deleted successfully');
            this.getAllProducts()
          },
          error: error => {
            console.log("error: " + error)
            this.snackbar.error('Error: ' + error);
            // this.error = error;
            this.loading = false;
          }
        });


      }
    });
  }


  openEditDialog(itemName: string, productId: string) {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '400px',
      data: { itemName, heading: "Confirm edit", title: 'Are you sure you want to edit this product?', cancelText: 'No', submitText: 'Yes' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Perform the delete operation here

        this.router.navigate(['/pages/products/edit-product', productId]);
      }
    });
  }


}
