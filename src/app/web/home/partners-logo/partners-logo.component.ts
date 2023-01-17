import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnerLogoClientService } from 'src/app/shared/services/clients/partner-logo-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
declare var $: any;
declare var Swiper: any;
@Component({
  selector: 'app-partners-logo',
  templateUrl: './partners-logo.component.html',
  styleUrls: ['./partners-logo.component.scss']
})
export class PartnersLogoComponent implements OnInit {
  private unsubscribeAll = new Subject();
  logos: any = [];
  customOptions: OwlOptions = {};
  constructor(public _translateUtil: TranslateUtilService,
    private _logoClient: PartnerLogoClientService,
    private _router: Router) { }

  ngOnInit(): void {
    this._translateUtil.getCurrentLangObs().pipe(takeUntil(this.unsubscribeAll))
    .subscribe((lang) => {
      this.customOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 3
          },
          400: {
            items: 4
          },
          740: {
            items: 5
          },
          940: {
            items: 6
          }
        },
        rtl: lang == 'ar'
      }
    })
    this.getLogos();
  }
  ngOnDestroy() {
    this.unsubscribeAll.complete();
    this.unsubscribeAll.next();
  }
  private getLogos() {
    this._logoClient.getLogos().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(logos => {
        this.logos = logos;
      })
  }
}
