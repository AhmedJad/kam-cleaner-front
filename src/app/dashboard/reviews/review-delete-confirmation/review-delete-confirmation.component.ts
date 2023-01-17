import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'review-delete-confirmation',
  templateUrl: './review-delete-confirmation.component.html',
  styleUrls: ['./review-delete-confirmation.component.scss']
})
export class ReviewDeleteConfirmationComponent implements OnInit {
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
