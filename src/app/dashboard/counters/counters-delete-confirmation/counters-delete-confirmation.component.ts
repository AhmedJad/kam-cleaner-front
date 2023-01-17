import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'counter-delete-confirmation',
  templateUrl: './counters-delete-confirmation.component.html',
  styleUrls: ['./counters-delete-confirmation.component.scss']
})
export class CountersDeleteConfirmationComponent implements OnInit {

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
