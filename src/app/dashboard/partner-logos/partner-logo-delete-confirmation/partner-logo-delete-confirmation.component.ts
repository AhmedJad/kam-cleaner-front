import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'partner-logo-delete-confirmation',
  templateUrl: './partner-logo-delete-confirmation.component.html',
  styleUrls: ['./partner-logo-delete-confirmation.component.scss']
})
export class PartnerLogoDeleteConfirmationComponent implements OnInit {
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
