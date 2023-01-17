import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'services-delete-confirmation',
  templateUrl: './services-delete-confirmation.component.html',
  styleUrls: ['./services-delete-confirmation.component.scss']
})
export class ServicesDeleteConfirmationComponent implements OnInit {
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
