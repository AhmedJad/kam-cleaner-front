import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'product-delete-confirmation',
  templateUrl: './product-delete-confirmation.component.html',
  styleUrls: ['./product-delete-confirmation.component.scss']
})
export class ProductDeleteConfirmationComponent implements OnInit {

  @Input() displayStyle = 'none';
  @Output() onClose = new EventEmitter();
  @Output() deleteConfirmed = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }
  close() {
    this.displayStyle = 'none';
    this.onClose.emit();
  }

}
