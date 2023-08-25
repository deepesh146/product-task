import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();


  ngOnInit(): void { }

  constructor(private authenticationService: AuthenticationService) {

  }

  userValue = this.authenticationService.userValue
  name = this.userValue?.user.firstName

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout() {
    this.authenticationService.logout()
  }
}
