import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { PartnerLogoClientService } from '../../shared/services/clients/partner-logo-client.service';

@Component({
  selector: 'partner-logos-table',
  templateUrl: './partner-logos-table.component.html',
  styleUrls: ['./partner-logos-table.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PartnerLogosTableComponent implements OnInit {
  page = 1;
  itemsPerPage = 5;
  totalItems = 0;
  logoForm = 'none';
  deleteModal = 'none';
  selectedLogo: any = null;
  logos: any[] = [];
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
  constructor(private _partnerLogoClient: PartnerLogoClientService,
    private _translate:TranslateService,
    private _toastr:ToastrService) {
  }
  ngOnInit(): void {
    this.getPartnerLogosPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.text = value;
        this.getPartnerLogosPage();
      })
  }
  ngOnDestory(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getPartnerLogosPage();
  }
  onActionClicked(id: any, slider = null, index = 0) {
    if (id == "add") {
      this.logoForm = 'block';
      this.selectedLogo = {};
    }
    else if (id == 'edit') {
      this.logoForm = 'block';
      this.selectedLogo = slider;
      this.selectedLogo.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedLogo = slider;
      this.selectedLogo.index = index;
    }
  }
  onLogoSaved(event: any) {
    this.logoForm = 'none';
    this.selectedLogo = event[0];
    if (event[1] == "created") {
      this.logos.unshift(this.selectedLogo);
    }
    else {
      this.logos[this.selectedLogo.index] = this.selectedLogo;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._partnerLogoClient.delete(this.selectedLogo.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.logos.splice(this.selectedLogo.index, 1);
        this.selectedLogo = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
        this._translate.instant("SUCCESS"));
        if (this.logos.length == 0) {
          if (this.page > 1) {
            this.page--;
          }
          this.getPartnerLogosPage();
        }
      })
  }
  //Commons
  private getPartnerLogosPage() {
    this._partnerLogoClient.getPage(this.page, this.itemsPerPage, this.text).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((logosPage: any) => {
        this.totalItems = logosPage.total;
        this.logos = logosPage.data;
      })
  }
}
