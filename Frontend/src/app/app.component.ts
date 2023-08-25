import { Component, OnInit } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { Socket } from 'ngx-socket-io';
import { SnackbarService } from './_services/snackbar.service';
import { AuthenticationService } from './_services/authentication.service';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'product-task';
  sockerId: string
  sideBarOpen = true;
  currentRoute: string;
  ngOnInit(): void {
    const urlSegments = this.route.snapshot.url.map(segment => segment.path);
    const userValue = this.authenticationService.userValue;
    const userId = userValue?.user.id
    // client-side
    // this.socket.on('connect', () => {
    //   const socketId = this.socket.ioSocket.id;
    //   console.log('Connected with socket ID:', socketId);
    // });
    this.socket.on("connect", () => {
      // this.socket.emit('setUserId', (userId))
      // this.socket.on("sockerId", (sockerId: string) => {
      //   console.log("sockerId", sockerId);
      //   this.sockerId = sockerId;
      //   this.authenticationService.socketId = sockerId;
      //   console.log("authenticationService socketId", this.authenticationService.socketId);
      // })
      console.log("websocket connected");
      const socketId = this.socket.ioSocket.id;
      this.authenticationService.socketId = socketId;
      console.log('Connected with socket ID:', socketId);
    });

    this.socket.on("disconnect", () => {
      console.log("websocket disconnected"); // undefined
    });

    this.socket.on('newProductAdded', (product: any) => {
      // Handle the new product update, e.g., update the UI
      console.log('New product added msg in APP COMPONENT', product);
      if (this.currentRoute == '/pages/products') {
        var msg = 'A new product has been added & the table is refreshed'

      } else {
        var msg = 'A new product has been added kindly check the dashboard page'
      }
      console.log("msgg::", msg)
      this.snackbar.success(msg);
      this.userService.setReceivedProduct(true);
    });

  }


  constructor(private socket: Socket, private snackbar: SnackbarService, private authenticationService: AuthenticationService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects; // Update current route
        console.log("in router event: " + this.currentRoute);
      }
    });
    ReactiveFormConfig.set({
      "validationMessage": {
        "required": "This field is required.",
        "minLength": "Enter minimum length of {{1}} characters.",
        "compare": "The value should be matched with {{1}}.",
        "alpha": "you can only enter alphabets.",
        "email": "Invalid email address"
      }
    });
  }
}
