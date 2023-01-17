import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SliderClientService } from 'src/app/shared/services/clients/slider-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
declare var $: any;
declare var Swiper: any;
@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {
  private unsubscribeAll = new Subject();
  sliders: any = [];
  dir = "rtl";
  constructor(public _translateUtil: TranslateUtilService,
    private _sliderClient: SliderClientService) { }

  ngOnInit(): void {
    this._translateUtil.getCurrentLangObs().pipe(takeUntil(this.unsubscribeAll)).subscribe((lang) => {
      this.setMainSlidersScript();
    })
    this.getSliders();
  }
  ngOnDestroy() {
    this.unsubscribeAll.complete();
    this.unsubscribeAll.next();
  }
  //Commons
  private setMainSlidersScript() {
    setTimeout(() => {
      if ($(".thm-swiper__slider").length) {
        $(".thm-swiper__slider").each(function () {
        let elm = $(this);
          let options = elm.data('swiper-options');
          let thmSwiperSlider = new Swiper(elm, options);
        });
      }
    }, 1000);
  }
  private getSliders() {
    this._sliderClient.getAllSliders().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(sliders => {
        this.sliders = sliders;
        this.setMainSlidersScript();
      })
  }
}
