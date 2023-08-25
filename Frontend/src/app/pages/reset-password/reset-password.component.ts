import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { SnackbarService } from '@app/_services/snackbar.service';
import { environment } from '@app/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  public lad = false;
  public hide: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackbar: SnackbarService,
    private http: HttpClient
  ) {
    // // redirect to home if already logged in
    // if (this.authenticationService.userValue) {
    //   this.router.navigate(['/']);
    // }
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('newpassword');
  
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
  
    return null;
  }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      newpassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.passwordMatchValidator });

  }

  token: string = '';

  onSubmit() {
    this.resetForm.markAllAsTouched()
    if(this.resetForm.invalid){
      console.log("Please enter",this.resetForm);
      this.snackbar.error("Password & confirm password must be same")
      return;
    }
    // Send the token to your backend API
    this.http.post<any>(environment.apiUrl + '/auth/reset-password' + '?token=' + this.token, {
      password: this.resetForm.value.newpassword
    }).subscribe({
      next: () => {
        // get return url from route parameters or default to '/'
        this.snackbar.success('Reset Password Successfull');
        this.router.navigate(['/login']);
      },
      error: error => {
        console.log("error: " + error)
        this.snackbar.error('Token verification failed')
        this.error = error;
        this.loading = false;
      }
    });
    // response => {
    // if (response.success) {
    // console.log('Token verified successfully');
    // // Proceed with resetting the password or other actions
    // this.snackbar.success('Reset Password Successfull');
    // } else {
    // console.log('Token verification failed');
    // this.snackbar.error('Token verification failed')
    // // Handle the error condition
    // }
    // });
  }

}
