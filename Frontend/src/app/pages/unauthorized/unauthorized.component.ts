import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {
  countdown: number = 5;
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Start the countdown timer
    this.startCountdown();
  }

  startCountdown(): void {
    const interval = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.redirectToLogin();
      }
    }, 1000);
  }
  redirectToLogin() {
    clearInterval(this.countdown);
    this.router.navigate(['/login']);
  }
}
