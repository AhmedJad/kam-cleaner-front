import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ArticleClientService } from '../../shared/services/clients/article-client.service';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticlesTableComponent implements OnInit {
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;
  articleForm = 'none';
  deleteModal = 'none';
  selectedArticle: any = null;
  articles: any = [];
  text = '';
  searchCtrl = new FormControl();
  actions = [
    { id: "add", icon: "fa fa-plus" },
  ];
  tableActions = [
    { id: "edit", icon: "fa fa-edit text-secondary" },
    { id: "delete", icon: "fa fa-trash text-secondary" },
  ];
  private unsubscribeAll = new Subject();
  constructor(private _articleClient: ArticleClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getArticlesPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.page = 1;
        this.text = value;
        this.getArticlesPage();
      })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onActionClicked(id: any, slider = null, index = 0) {
    if (id == "add") {
      this.articleForm = 'block';
      this.selectedArticle = {};
    }
    else if (id == 'edit') {
      this.articleForm = 'block';
      this.selectedArticle = slider;
      this.selectedArticle.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedArticle = slider;
      this.selectedArticle.index = index;
    }
  }
  onArticleSaved(event: any) {
    this.articleForm = 'none';
    this.selectedArticle = event[0];
    if (event[1] == "created") {
      this.articles.unshift(this.selectedArticle);
    }
    else {
      this.articles[this.selectedArticle.index] = this.selectedArticle;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._articleClient.delete(this.selectedArticle.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.articles.splice(this.selectedArticle.index, 1);
        this.selectedArticle = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        if (this.articles.length == 0) {
          if (this.page > 1) {
            this.page--;
          }
          this.getArticlesPage();
        }
      })
  }
  onPageChange(page: any) {
    this.page = page;
    this.getArticlesPage();
  }
  //Commons
  private getArticlesPage() {
    this._articleClient.getPage(this.page, this.itemsPerPage, this.text).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((articlesPage: any) => {
        this.totalItems = articlesPage.total;
        this.articles = articlesPage.data;
      })
  }

}
