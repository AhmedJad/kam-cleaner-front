import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AR_IMAGE, EN_IMAGE, MONTHES_NAMES } from 'src/app/shared/global';
import { ArticleClientService } from 'src/app/shared/services/clients/article-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() contact: any = {};
  year = new Date().getFullYear();
  articles: any = [];
  limit = 2;
  private unsubscribeAll = new Subject();
  constructor(private _articleClient: ArticleClientService,
    public _translateUtil: TranslateUtilService) { }
  ngOnInit(): void {
    this._articleClient.getLatestArticles(this.limit).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(articles => {
        this.articles = articles;
      });
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  getDay(date: string) {
    return new Date(Date.parse(date)).getDate();
  }
  getMonth(date: string) {
    return MONTHES_NAMES[new Date(Date.parse(date)).getMonth()];
  }
  getYear(date: string) {
    return new Date(Date.parse(date)).getFullYear();
  }
}
