import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'employee-delete-confirmation',
  templateUrl: './employee-delete-confirmation.component.html',
  styleUrls: ['./employee-delete-confirmation.component.scss']
})
export class EmployeeDeleteConfirmationComponent implements OnInit {
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
