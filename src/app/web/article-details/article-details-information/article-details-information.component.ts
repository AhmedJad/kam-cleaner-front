import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MONTHES_NAMES } from 'src/app/shared/global';
import { ArticleClientService } from 'src/app/shared/services/clients/article-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-article-details-information',
  templateUrl: './article-details-information.component.html',
  styleUrls: ['./article-details-information.component.scss']
})
export class ArticleDetailsInformationComponent implements OnInit {
  article = null;
  latestArticles: any = [];
  limit = 3;
  private unsubscribeAll = new Subject();
  constructor(private _articleClient: ArticleClientService,
    public _translateUtil: TranslateUtilService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this._articleClient.show(params.id)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((article: any) => {
          this.article = article;
        })
    });
    this._articleClient.getLatestArticles(this.limit).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(latestArticles => {
        this.latestArticles = latestArticles;
      })
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
}
