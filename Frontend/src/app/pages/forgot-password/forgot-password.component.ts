import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { SnackbarService } from '@app/_services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  isActive: true | undefined;
  loading : boolean = false;
  public forgetForm!: FormGroup;

  constructor(private fb: FormBuilder, private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackbar: SnackbarService) { }

  public ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: [null, [Validators.required]],
    });
  }

  public onForget(): void {
    // stop here if form is invalid
    if (this.forgetForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.forgotPassword(this.forgetForm.value).subscribe({
      next: () => {
        // get return url from route parameters or default to '/'
        console.log("email sent successfully")
        this.snackbar.success("Check your email to reset your password")
        this.loading = false;
      },
      error: (error) => {
        console.log("error: " + error)
        this.snackbar.error('Error: ' + error);
        this.loading = false;
      }
    });
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }
}
