import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { SnackbarService } from '@app/_services/snackbar.service';

@Component({
  selector: 'app-loginnew',
  templateUrl: './loginnew.component.html',
  styleUrls: ['./loginnew.component.scss']
})
export class LoginnewComponent {
  loginForm!: FormGroup;
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
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/pages/products']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

   onSubmit() {
       this.submitted = true;

       // stop here if form is invalid
       if (this.loginForm.invalid) {
           return;
       }

       this.error = '';
       this.loading = true;
       this.authenticationService.login(this.loginForm.value)
           .subscribe({
               next: () => {
                   // get return url from route parameters or default to '/'
                   console.log("logged in successfully")
                   this.snackbar.success("Logged in successfully");
                   const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages/products';
                   console.log("returnUrl: " + returnUrl)
                   this.loading = false;
                   this.router.navigate([returnUrl]);
               },
               error: error => {
                this
                   this.error = error;
                   this.snackbar.error('Error: ' + error);
                   this.loading = false;
               }
           });
   }

}
