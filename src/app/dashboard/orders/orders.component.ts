import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { OrderClientService } from 'src/app/shared/services/clients/order-client.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {
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
  constructor(private _orderClientService: OrderClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getOrdersPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.page = 1;
        this.text = value;
        this.getOrdersPage();
      })
    this.orderStatusCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => {
        this.orderStatus = value;
        this.page = 1;
        this.searchCtrl.setValue(this.text = '');
        this.getOrdersPage();
      })
    this.paymentStatusCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => {
        this.page = 1;
        this.searchCtrl.setValue(this.text = '');
        this.paymentStatus = value;
        this.getOrdersPage();
      })
    // this.paymentMethodCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
    //   .subscribe(value => {
    //     this.paymentMethod = value;
    //     this.getOrdersPage();
    //   })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  onPageChange(page: any) {
    this.page = page;
    this.getOrdersPage();
  }
  onActionClicked(id: any, order = null) {
    if (id == "view") {
      this.orderForm = 'block';
      this.selectedOrder = order;
    }
  }
  updateStatusOrder(order) {
    this._orderClientService.updateOrderStatus({
      order_id: order.id,
      order_status: order.order_status
    }).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((returnedOrder: any) => {
        order.order_status = returnedOrder.order_status;
        order.payment_status = returnedOrder.payment_status;
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      });
  }
  //Commons
  private getOrdersPage() {
    this._orderClientService.getPage(this.page, this.itemsPerPage, this.text, this.orderStatus
      , this.paymentStatus, this.paymentMethod).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((ordersPage: any) => {
        this.totalItems = ordersPage.total;
        this.orders = ordersPage.data;
      })
  }
}
