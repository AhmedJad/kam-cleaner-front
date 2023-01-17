import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'article-delete-confirmation',
  templateUrl: './article-delete-confirmation.component.html',
  styleUrls: ['./article-delete-confirmation.component.scss']
})
export class ArticleDeleteConfirmationComponent implements OnInit {

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
