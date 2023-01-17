import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AR_IMAGE, EN_IMAGE } from '../../global';
import { SidenavService } from '../../services/sidenav.service';
import { TranslateUtilService } from '../../services/translate-util.service';
import { BreakpointObserver } from "@angular/cdk/layout"
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthClientService } from 'src/app/shared/services/clients/auth-client.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  displayStyle = "none";
  @ViewChild(MatSidenav) sidenav: any = null;
  showModal = false;
  dir = "ltr";
  name: string = "Ahmed Atef";
  AR_IMAGE = AR_IMAGE;
  EN_IMAGE = EN_IMAGE;
  links: any = [
    { title: "HOME", icon: "fa fa-file", url: "/home" },
    { title: "SLIDER", icon: "fa fa-file", url: "/slider" },
    { title: "SERVICES", icon: "fa fa-file", url: "/services" },
    { title: "ABOUT_US", icon: "fa fa-file", url: "/about" },
    { title: "CLIENTS", icon: "fa fa-file", url: "/clients" },
    { title: "COUNTERS", icon: "fa fa-file", url: "/counters" },
    { title: "EMPLOYEES", icon: "fa fa-file", url: "/employees" },
    { title: "REVIEWS", icon: "fa fa-file", url: "/reviews" },
    { title: "LOGOS", icon: "fa fa-file", url: "/partner-logos" },
    { title: "ARTICLES", icon: "fa fa-file", url: "/articles" },
    { title: "CONTACT_US", icon: "fa fa-file", url: "/contact-us" },
    { title: "GALLERIES", icon: "fa fa-file", url: "/galleries" },
    { title: "FAQS", icon: "fa fa-file", url: "/faqs" },
    { title: "PRODUCTS", icon: "fa fa-file", url: "/products" },
    { title: "CONTACT_MESSAGES", icon: "fa fa-file", url: "/contact-form" },
    { title: "ORDERS", icon: "fa fa-file", url: "/orders" },
  ]
  private unsubscribeAll = new Subject();
  constructor(private observer: BreakpointObserver,
    private _sideNaveService: SidenavService,
    public _translateUtil: TranslateUtilService,
    private _authClient:AuthClientService,
    private _router:Router,
    private _token:TokenService) {
  }
  ngOnInit() {
  }
  ngOnDestory(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 820px)'])
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    this._translateUtil.getCurrentLangObs().pipe(takeUntil(this.unsubscribeAll))
      .subscribe((lang) => {
        if (lang == 'ar') {
          this.sidenav.toggle();
          this.sidenav.position = 'end';
          setTimeout(() => {
            this.sidenav.toggle();
          }, 100)
        }
        if (lang == 'en') {
          this.sidenav.toggle()
          this.sidenav.position = 'start';
          setTimeout(() => {
            this.sidenav.toggle();
          }, 100)
        }
      })
    this._sideNaveService.setSideNav(this.sidenav);
  }
  changeLang(event: any, lang: any) {
    event.preventDefault();
    this._translateUtil.changeLang(lang);
  }
  logout(event:any){
    event.preventDefault();
    this._authClient.logout().pipe(takeUntil(this.unsubscribeAll))
    .subscribe(()=>{
      this._token.remove();
      this._router.navigate(["/home"]);
    });
  }
}
