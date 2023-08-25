import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Result } from '@app/_models/products';
import { Daum } from '@app/_models/wallethistoryResponse';
import { SnackbarService } from '@app/_services/snackbar.service';
import { UserService } from '@app/_services/user.service';
import { merge, startWith, switchMap, catchError, map } from 'rxjs';
import { Observable, of as observableOf, pipe } from 'rxjs';
import { TopupComponent } from '../topup/topup.component';
import { PurchaseProductsComponent } from '../purchase-products/purchase-products.component';

@Component({
  selector: 'app-wallethistory',
  templateUrl: './wallethistory.component.html',
  styleUrls: ['./wallethistory.component.scss']
})
export class WallethistoryComponent {
  @Input() receivedProduct: any;
  balance: any;
  displayedColumns = ['date', 'type', 'amount', 'productName', "ProductQuantity",];
  loading = false;
  products?: Result[];
  dataSource!: MatTableDataSource<Daum>;
  totalResults!: number;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private cdRef: ChangeDetectorRef, private dialog: MatDialog, private snackbar: SnackbarService) {
    this.getBalance()

  }


  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log('Hello from wallet');
    this.getAll()
  }



  getAll() {
    merge()
      .pipe(
        startWith(''),
        switchMap(() => {
          this.loading = true;
          this.cdRef.detectChanges();
          return this.userService.getWalletHistory().pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.loading = false;
          if (data === null) {
            return [];
          }
          return data.data;
        })
      )
      .subscribe((data) => {
        console.log("in subscribers: " + data)
        console.log("loading results: " + this.loading)
        this.dataSource = new MatTableDataSource(data)
      })

  }

  getBalance() {
    this.loading = true;
    this.userService.getBalance().subscribe({
      next: (data) => {
        // get return url from route parameters or default to '/'
        console.log("data in successfully", data)
        this.balance = data.data.balance
        this.loading = false;
        // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages/products';
        // console.log("returnUrl: " + returnUrl)
        // this.router.navigate([returnUrl]);
      },
      error: error => {
        console.log("error: " + error)
        this.snackbar.error('Error: ' + error);
        // this.error = error;
        this.loading = false;
      }
    });
  }


  applyFilter(event: any) {
    console.log(`applyFilter`, event.target.value);
    var filterValue = event.target.value
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }

  // top up


  openDialog() {
    const dialogRef = this.dialog.open(TopupComponent, {
      disableClose: true,
      width: '400px',
      data: { heading: "Topup", title: 'Enter Topup balance ', cancelText: 'Cancel', submitText: 'Submit' },
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      if (result === true) {
        this.getAll()
        this.getBalance()

      }
    });
  }

  openDialogPurchase() {
    const dialogRef = this.dialog.open(PurchaseProductsComponent, {
      disableClose: true,
      width: '400px',
      data: { heading: "Purchase", title: 'Purchase Products', cancelText: 'Cancel', submitText: 'Submit' },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.getAll()
        this.getBalance()


      }
    });
  }
}
