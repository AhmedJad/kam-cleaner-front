import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { MONTHES_NAMES } from 'src/app/shared/global';
import { ContactFormClientService } from 'src/app/shared/services/clients/contact-form-client.service';

@Component({
  selector: 'app-contact-form-table',
  templateUrl: './contact-form-table.component.html',
  styleUrls: ['./contact-form-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactFormTableComponent implements OnInit {
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;
  contactForm = 'none';
  deleteModal = 'none';
  selectedContactForm: any = null;
  contactForms: any[] = [];
  text = '';
  searchCtrl = new FormControl();
  tableActions = [
    { id: "view", icon: "fa fa-eye text-secondary" }
  ];
  private unsubscribeAll = new Subject();
  constructor(private _contactFormClient: ContactFormClientService) {
  }
  ngOnInit(): void {
    this.getContactFormPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.page = 1;
        this.text = value;
        this.getContactFormPage();
      })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getContactFormPage();
  }
  onActionClicked(id: any, employee = null, index = 0) {
    if (id == 'view') {
      this.contactForm = 'block';
      this.selectedContactForm = employee;
    }
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

  //Commons
  private getContactFormPage() {
    this._contactFormClient.getPage(this.page, this.itemsPerPage, this.text).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((contactFormPage: any) => {
        this.totalItems = contactFormPage.total;
        this.contactForms = contactFormPage.data;
      })
  }
}
