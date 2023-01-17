import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { OrderClientService } from 'src/app/shared/services/clients/order-client.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserOrdersComponent implements OnInit {
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;
  orders: any[] = [];
  text = '';
  orderStatus = '';
  paymentStatus = '';
  paymentMethod = '';
  searchCtrl = new FormControl('');
  orderStatusCtrl = new FormControl('');
  paymentStatusCtrl = new FormControl('');
  paymentMethodCtrl = new FormControl('');
  private unsubscribeAll = new Subject();
  orderForm = 'none';
  tableActions = [
    { id: "view", icon: "fa fa-eye text-secondary" },
  ];
  selectedOrder = null;
  constructor(private _orderClientService: OrderClientService) {
  }
  ngOnInit(): void {
    this.getUserOrdersPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.page = 1;
        this.text = value;
        this.getUserOrdersPage();
      })
    this.orderStatusCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => {
        this.page = 1;
        this.searchCtrl.setValue(this.text = '');
        this.orderStatus = value;
        this.getUserOrdersPage();
      })
    this.paymentStatusCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => {
        this.page = 1;
        this.searchCtrl.setValue(this.text = '');
        this.paymentStatus = value;
        this.getUserOrdersPage();
      })
    // this.paymentMethodCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
    //   .subscribe(value => {
    //     this.paymentMethod = value;
    //     this.getUserOrdersPage();
    //   })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  onPageChange(page: any) {
    this.page = page;
    this.getUserOrdersPage();
  }
  onActionClicked(id: any, order = null) {
    if (id == "view") {
      this.orderForm = 'block';
      this.selectedOrder = order;
    }
  }
  //Commons
  private getUserOrdersPage() {
    this._orderClientService.geUserOrdersPage(this.page, this.itemsPerPage, this.text, this.orderStatus
      , this.paymentStatus, this.paymentMethod).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((ordersPage: any) => {
        this.totalItems = ordersPage.total;
        this.orders = ordersPage.data;
      })
  }
}
