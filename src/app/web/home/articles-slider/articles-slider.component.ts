import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MONTHES_NAMES } from 'src/app/shared/global';
import { ArticleClientService } from 'src/app/shared/services/clients/article-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
declare var $: any;
declare var Swiper: any;
@Component({
  selector: 'app-articles-slider',
  templateUrl: './articles-slider.component.html',
  styleUrls: ['./articles-slider.component.scss']
})
export class ArticlesSliderComponent implements OnInit {
  private unsubscribeAll = new Subject();
  articles: any = [];
  limit = 6;
  lang;
  customOptions: OwlOptions = {};
  constructor(public _translateUtil: TranslateUtilService,
    private _articleClient: ArticleClientService,
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
    this.getArticles();
  }
  ngOnDestroy() {
    this.unsubscribeAll.complete();
    this.unsubscribeAll.next();
  }
  private getArticles() {
    this._articleClient.getLatestArticles(this.limit).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(articles => {
        this.articles = articles;
      })
  }
  getDay(date: string) {
    return new Date(Date.parse(date)).getDate();
  }
  getMonth(date: string) {
    return MONTHES_NAMES[new Date(Date.parse(date)).getMonth()];
  }

}
