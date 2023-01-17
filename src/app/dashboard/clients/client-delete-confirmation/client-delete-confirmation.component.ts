import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'client-delete-confirmation',
  templateUrl: './client-delete-confirmation.component.html',
  styleUrls: ['./client-delete-confirmation.component.scss']
})
export class ClientDeleteConfirmationComponent implements OnInit {
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
