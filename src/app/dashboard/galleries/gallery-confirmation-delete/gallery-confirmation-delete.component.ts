import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gallery-confirmation-delete',
  templateUrl: './gallery-confirmation-delete.component.html',
  styleUrls: ['./gallery-confirmation-delete.component.scss']
})
export class GalleryConfirmationDeleteComponent implements OnInit {
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
