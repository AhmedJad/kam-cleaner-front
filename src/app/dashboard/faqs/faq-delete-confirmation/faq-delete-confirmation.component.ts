import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'faq-delete-confirmation',
  templateUrl: './faq-delete-confirmation.component.html',
  styleUrls: ['./faq-delete-confirmation.component.scss']
})
export class FaqDeleteConfirmationComponent implements OnInit {
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
