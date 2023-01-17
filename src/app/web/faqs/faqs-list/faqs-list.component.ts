import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebDataService } from 'src/app/shared/layouts/web/web-data.service';
import { FaqClientService } from 'src/app/shared/services/clients/faq-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
declare var $: any;
@Component({
  selector: 'app-faqs-list',
  templateUrl: './faqs-list.component.html',
  styleUrls: ['./faqs-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class FaqsListComponent implements OnInit {
  page = 1;
  itemsPerPage = 6;
  totalItems = 0;
  contact = null;
  faqs = [];
  private unsubscribeAll = new Subject();
  constructor(private _faqClient: FaqClientService,
    public _translateUtil: TranslateUtilService,
    private _webData:WebDataService) { }

  ngOnInit(): void {
    this.getFaqsPage();
    this.getContact();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getFaqsPage();
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Commons
  private getFaqsPage() {
    this._faqClient.getPage(this.page, this.itemsPerPage).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((faqsPage: any) => {
        this.totalItems = faqsPage.total;
        this.faqs = faqsPage.data;
        this.setAccordionScript();
      })
  }
  private setAccordionScript() {
    setTimeout(() => {
      if ($(".accrodion-grp").length) {
        console.log($(".accrodion-grp").length);
        var accrodionGrp = $(".accrodion-grp");
        accrodionGrp.each(function () {
          var accrodionName = $(this).data("grp-name");
          var Self = $(this);
          var accordion = Self.find(".accrodion");
          Self.addClass(accrodionName);
          Self.find(".accrodion .accrodion-content").hide();
          Self.find(".accrodion.active").find(".accrodion-content").show();
          accordion.each(function () {
            $(this)
              .find(".accrodion-title")
              .on("click", function () {
                if ($(this).parent().hasClass("active") === false) {
                  $(".accrodion-grp." + accrodionName)
                    .find(".accrodion")
                    .removeClass("active");
                  $(".accrodion-grp." + accrodionName)
                    .find(".accrodion")
                    .find(".accrodion-content")
                    .slideUp();
                  $(this).parent().addClass("active");
                  $(this).parent().find(".accrodion-content").slideDown();
                }
              });
          });
        });
      }
    }, 200)
  }
  //Commons
  private getContact() {
    this._webData.$contact.pipe(takeUntil(this.unsubscribeAll))
      .subscribe((contact: any) => {
        this.contact = contact;
      })
  }
}
