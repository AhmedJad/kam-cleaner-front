import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sideNav: any;
  public setSideNav(sideNav: any) {
    this.sideNav = sideNav;
  }
  closeSideNav() {
    this.sideNav.close();
  }
  openSideNav() {
    this.sideNav.open();
  }
}
