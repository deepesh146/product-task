import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { SnackbarService  } from '@app/_services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
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
    private snackbar: SnackbarService
  ) {
    // // redirect to home if already logged in
    // if (this.authenticationService.userValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['',[ Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['',],
    });
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    this.authenticationService.register(this.signupForm.value).subscribe({
      next: () => {
        // get return url from route parameters or default to '/'
        console.log("logged in successfully")
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages/products';
        console.log("returnUrl: " + returnUrl)
        this.router.navigate([returnUrl]);
        this.loading = false;
      },
      error: error => {
        console.log("error: " + error)
        this.snackbar.error('Error: ' + error);
        this.error = error;
        this.loading = false;
      }
    });
  }

}
