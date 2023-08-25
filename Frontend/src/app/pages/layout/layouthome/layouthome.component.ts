import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layouthome',
  templateUrl: './layouthome.component.html',
  styleUrls: ['./layouthome.component.scss']
})
export class LayouthomeComponent {
  sideBarOpen = true;
  isSmallScreen = false;
  sideBarToggler() {
    // if (this.isSmallScreen) {
    //   this.sideBarOpen = false
    // }
    console.log(this.sideBarOpen,"valueee")
    this.sideBarOpen = !this.sideBarOpen;
  }
  constructor(private breakpointObserver: BreakpointObserver) { }


  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        if (this.isSmallScreen) {
          this.sideBarOpen = false
        }
      });
  }

  onSidenavClosed() {
    this.sideBarOpen = false;
    console.log('Sidenav is closed');
  }
}
