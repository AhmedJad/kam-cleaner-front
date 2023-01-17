import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'slider-delete-confirmation',
  templateUrl: './slider-delete-confirmation.component.html',
  styleUrls: ['./slider-delete-confirmation.component.scss']
})
export class SliderDeleteConfirmationComponent implements OnInit {
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
