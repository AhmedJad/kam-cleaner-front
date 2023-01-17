import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent {
  @Input() displayStyle = 'none';
  @Input() selectedOrder: any = null;
  @Output() onClose = new EventEmitter();
  constructor(public _translateUtil: TranslateUtilService) { }
  //Methods
  close() {
    this.displayStyle = 'none';
    this.onClose.emit();
  }
}
