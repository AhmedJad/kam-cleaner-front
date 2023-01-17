import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MONTHES_NAMES } from 'src/app/shared/global';
import { ArticleClientService } from 'src/app/shared/services/clients/article-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-articals-list',
  templateUrl: './articals-list.component.html',
  styleUrls: ['./articals-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ArticalsListComponent implements OnInit {
  page = 1;
  itemsPerPage = 6;
  totalItems = 0;
  articles = [];
  private unsubscribeAll = new Subject();
  constructor(private _articalClient: ArticleClientService,
    public _translateUtil: TranslateUtilService) { }

  ngOnInit(): void {
    this.getArticlesPage();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getArticlesPage();
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Commons
  private getArticlesPage() {
    this._articalClient.getPage(this.page, this.itemsPerPage).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((articlesPage: any) => {
        this.totalItems = articlesPage.total;
        this.articles = articlesPage.data;
      })
  }
  getDay(date: string) {
    return new Date(Date.parse(date)).getDate();
  }
  getMonth(date: string) {
    return MONTHES_NAMES[new Date(Date.parse(date)).getMonth()];
  }

}
