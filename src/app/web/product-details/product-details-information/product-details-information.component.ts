import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebDataService } from 'src/app/shared/layouts/web/web-data.service';
import { ProductClientService } from 'src/app/shared/services/clients/product-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-product-details-information',
  templateUrl: './product-details-information.component.html',
  styleUrls: ['./product-details-information.component.scss']
})
export class ProductDetailsInformationComponent implements OnInit {
  product = null;
  contact = null;
  withSelect = false;
  private unsubscribeAll = new Subject();
  constructor(private _productClient: ProductClientService,
    public _translateUtil: TranslateUtilService,
    private _activatedRoute: ActivatedRoute,
    private _webData: WebDataService) { }

  ngOnInit(): void {
    this.getContact();
    this._productClient.show(this._activatedRoute.snapshot.paramMap.get("id"))
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((product: any) => {
        this.product = product;
      })
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Commons
  private getContact() {
    this._webData.$contact.pipe(takeUntil(this.unsubscribeAll))
      .subscribe((contact: any) => {
        this.contact = contact;
      })
  }
}
