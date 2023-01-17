import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ReviewClientService } from '../../shared/services/clients/review-client.service';

@Component({
  selector: 'reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrls: ['./reviews-table.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ReviewsTableComponent implements OnInit {
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;
  reviewForm = 'none';
  deleteModal = 'none';
  selectedReview: any = null;
  reviews: any[] = [];
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
  constructor(private _reviewClient: ReviewClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getReviewsPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.page = 1;
        this.text = value;
        this.getReviewsPage();
      })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getReviewsPage();
  }
  onActionClicked(id: any, review = null, index = 0) {
    if (id == "add") {
      this.reviewForm = 'block';
      this.selectedReview = {};
    }
    else if (id == 'edit') {
      this.reviewForm = 'block';
      this.selectedReview = review;
      this.selectedReview.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedReview = review;
      this.selectedReview.index = index;
    }
  }
  onReviewSaved(event: any) {
    this.reviewForm = 'none';
    this.selectedReview = event[0];
    if (event[1] == "created") {
      this.reviews.unshift(this.selectedReview);
    }
    else {
      this.reviews[this.selectedReview.index] = this.selectedReview;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._reviewClient.delete(this.selectedReview.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.reviews.splice(this.selectedReview.index, 1);
        this.selectedReview = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        if (this.reviews.length == 0) {
          if (this.page > 1) {
            this.page--;
          }
          this.getReviewsPage();
        }
      })
  }
  //Commons
  private getReviewsPage() {
    this._reviewClient.getPage(this.page, this.itemsPerPage, this.text).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((employeesPage: any) => {
        this.totalItems = employeesPage.total;
        this.reviews = employeesPage.data;
      })
  }
}
