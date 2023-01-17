import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContactClientService } from '../../services/clients/contact-client.service';
import { TranslateUtilService } from '../../services/translate-util.service';
import { WebDataService } from './web-data.service';
declare var $: any;
@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit, OnDestroy {
  contact: any = {};
  private unsubscribeAll = new Subject();
  constructor(public _translateUtil: TranslateUtilService,
    private _contactClient: ContactClientService,
    private _webData: WebDataService) { }

  ngOnInit(): void {
    this._contactClient.showFirst().pipe(takeUntil(this.unsubscribeAll))
      .subscribe((contact: any) => {
        this.contact = contact;
        this._webData.setContact(contact);
      })
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  ngAfterViewInit() {
    $.getScript("assets/js/brote.js");
  }
}
