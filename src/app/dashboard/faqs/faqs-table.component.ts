import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FaqClientService } from '../../shared/services/clients/faq-client.service';

@Component({
  selector: 'faqs-table',
  templateUrl: './faqs-table.component.html',
  styleUrls: ['./faqs-table.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class FaqsTableComponent implements OnInit {
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;
  faqForm = 'none';
  deleteModal = 'none';
  selectedFaq: any = null;
  faqs: any[] = [];
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
  constructor(private _faqClient: FaqClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getFaqsPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.page = 1;
        this.text = value;
        this.getFaqsPage();
      })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getFaqsPage();
  }
  onActionClicked(id: any, employee = null, index = 0) {
    if (id == "add") {
      this.faqForm = 'block';
      this.selectedFaq = {};
    }
    else if (id == 'edit') {
      this.faqForm = 'block';
      this.selectedFaq = employee;
      this.selectedFaq.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedFaq = employee;
      this.selectedFaq.index = index;
    }
  }
  onFaqSaved(event: any) {
    this.faqForm = 'none';
    this.selectedFaq = event[0];
    if (event[1] == "created") {
      this.faqs.unshift(this.selectedFaq);
    }
    else {
      this.faqs[this.selectedFaq.index] = this.selectedFaq;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._faqClient.delete(this.selectedFaq.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.faqs.splice(this.selectedFaq.index, 1);
        this.selectedFaq = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        if (this.faqs.length == 0) {
          if (this.page > 1) {
            this.page--;
          }
          this.getFaqsPage();
        }
      })
  }
  //Commons
  private getFaqsPage() {
    this._faqClient.getPage(this.page, this.itemsPerPage, this.text).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((faqsPage: any) => {
        this.totalItems = faqsPage.total;
        this.faqs = faqsPage.data;
      })
  }

}
