import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReviewClientService } from 'src/app/shared/services/clients/review-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-reviews-slider',
  templateUrl: './reviews-slider.component.html',
  styleUrls: ['./reviews-slider.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ReviewsSliderComponent implements OnInit {
  private unsubscribeAll = new Subject();
  reviews: any = [];
  customOptions: OwlOptions = {};
  constructor(public _translateUtil: TranslateUtilService,
    private _reviewClient: ReviewClientService) { }
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
              items: 1
            },
            400: {
              items: 2
            },
            740: {
              items: 2
            },
            940: {
              items: 3
            }
          },
          rtl: lang == 'ar'
        }
      })
    this.getReviews();
  }
  ngOnDestroy() {
    this.unsubscribeAll.complete();
    this.unsubscribeAll.next();
  }
  private getReviews() {
    this._reviewClient.getAllReviews().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(reviews => {
        this.reviews = reviews;
      })
  }
}
