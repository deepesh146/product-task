import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '@app/_services/snackbar.service';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.scss']
})
export class TopupComponent {
  topupForm: FormGroup;
  loading: boolean = false;
  balance: number = 0;
  constructor(
    public dialogRef: MatDialogRef<TopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    this.topupForm = this.formBuilder.group({
      amount: ['', Validators.required],
    });
    this.getBalance()
  }

  submit() {
    this.loading = true;
    if(this.topupForm.invalid) return;
    this.userService.WalletTopUp(this.topupForm.value).subscribe({
      next: (data) => {
        // get return url from route parameters or default to '/'
        console.log("data in successfully", data)
        this.balance = data.data.amount
        this.loading = false;
        this.snackbar.success('Topup successful');
        this.dialogRef.close(true);
      },
      error: error => {
        console.log("error: " + error)
        this.snackbar.error('Error: ' + error);
        // this.error = error;
        this.loading = false;
      }
    });
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


}
