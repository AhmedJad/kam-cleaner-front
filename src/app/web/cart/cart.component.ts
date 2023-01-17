import { Component, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaymentClientService } from 'src/app/shared/services/payment-client.service';
import { CartClientService } from 'src/app/shared/services/clients/cart-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit, OnDestroy {
  cartInfo = { total_price: 0, products: [] };
  private unsubscribeAll = new Subject();
  constructor(private _cartClient: CartClientService,
    public _translateUtil: TranslateUtilService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    private _paymentClient: PaymentClientService,
  ) { }

  ngOnInit(): void {
    this.getCartProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  removeItemFromCart(event, product, index) {
    event.preventDefault();
    this._cartClient.delete(product.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this._toastr.success(this._translate.instant("ITEM_REMOVED_FROM_CART"),
          this._translate.instant("SUCCESS"));
        this.cartInfo.products.splice(index, 1);
        this.cartInfo.total_price = this.getTotalPrice();
      });
  }
  cashPayment() {
    this._paymentClient.cashPayment().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        $("#exampleModal").modal("toggle");
        this.cartInfo = { total_price: 0, products: [] };
      })
  }
  onlinePayment() {
    this._paymentClient.onlinePayment().pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response: any) => {
        window.location.href = response.url;
      })
  }
  //Commons
  private getCartProducts() {
    this._cartClient.getCartItems().pipe(takeUntil(this.unsubscribeAll))
      .subscribe((cartInfo: any) => {
        this.cartInfo.total_price = cartInfo.total_price;
        this.cartInfo.products = cartInfo.products;
      })
  }
  private getTotalPrice() {
    let total_price = 0;
    this.cartInfo.products.forEach((product) => {
      total_price += product.price;
    })
    return total_price;
  }
}
