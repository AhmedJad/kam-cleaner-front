import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartClientService } from 'src/app/shared/services/clients/cart-client.service';
import { ProductClientService } from 'src/app/shared/services/clients/product-client.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsListComponent implements OnInit {
  page = 1;
  itemsPerPage = 6;
  totalItems = 0;
  products = [];
  cartItems = [];
  private unsubscribeAll = new Subject();
  constructor(private _productClient: ProductClientService,
    public _translateUtil: TranslateUtilService,
    private _cartClient: CartClientService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    public _token: TokenService,
    private _router: Router) { }
  ngOnInit(): void {
    this.getProductsPage();
    this.getCartProducts();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getProductsPage();
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  addToCart(event, product) {
    event.preventDefault();
    if (this.isUserType()) {
      this._cartClient.addToCart({
        "product_id": product.id,
        "price": product.price,
      }).pipe(takeUntil(this.unsubscribeAll)).subscribe(() => {
        this._toastr.success(this._translate.instant("ITEM_ADDED_TO_CART_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        this.cartItems.push(product);
      })
    }
    else {
      this._router.navigate(['/login']);
    }
  }
  public itemAddedToCart(product) {
    return this.cartItems.filter(item => {
      return item.id == product.id
    }).length > 0
  }
  public isUserType() {
    return this._token.payload() && !this._token.payload().type;
  }
  public isGuest() {
    return !this._token.payload();
  }
  public isAdminType() {
    return this._token.payload() && this._token.payload().type == 'Admin';
  }
  //Commons
  private getProductsPage() {
    this._productClient.getPage(this.page, this.itemsPerPage).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((productsPage: any) => {
        this.totalItems = productsPage.total;
        this.products = productsPage.data;
      })
  }
  private getCartProducts() {
    if (this.isUserType()) {
      this._cartClient.getCartItems().pipe(takeUntil(this.unsubscribeAll))
        .subscribe((cartInfo: any) => {
          this.cartItems = cartInfo.products;
        })
    }
  }
}
