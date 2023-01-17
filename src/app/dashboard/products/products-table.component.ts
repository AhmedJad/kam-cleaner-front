import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ProductClientService } from 'src/app/shared/services/clients/product-client.service';

@Component({
  selector: 'products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ProductsTableComponent implements OnInit {
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;
  productForm = 'none';
  deleteModal = 'none';
  selectedProduct: any = null;
  products: any[] = [];
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
  constructor(private _productClient: ProductClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getProductsPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.page = 1;
        this.text = value;
        this.getProductsPage();
      })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getProductsPage();
  }
  onActionClicked(id: any, employee = null, index = 0) {
    if (id == "add") {
      this.productForm = 'block';
      this.selectedProduct = {};
    }
    else if (id == 'edit') {
      this.productForm = 'block';
      this.selectedProduct = employee;
      this.selectedProduct.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedProduct = employee;
      this.selectedProduct.index = index;
    }
  }
  onProductSaved(event: any) {
    this.productForm = 'none';
    this.selectedProduct = event[0];
    if (event[1] == "created") {
      this.products.unshift(this.selectedProduct);
    }
    else {
      this.products[this.selectedProduct.index] = this.selectedProduct;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._productClient.delete(this.selectedProduct.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.products.splice(this.selectedProduct.index, 1);
        this.selectedProduct = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        if (this.products.length == 0) {
          if (this.page > 1) {
            this.page--;
          }
          this.getProductsPage();
        }
      })
  }
  onFormClosed(){
    this.productForm='none';
    this.selectedProduct=null;
  }
  //Commons
  private getProductsPage() {
    this._productClient.getPage(this.page, this.itemsPerPage, this.text).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((productsPage: any) => {
        this.totalItems = productsPage.total;
        this.products = productsPage.data;
      })
  }
}
