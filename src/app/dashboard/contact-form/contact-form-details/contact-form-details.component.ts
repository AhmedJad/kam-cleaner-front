import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
@Component({
  selector: 'contact-form-details',
  templateUrl: './contact-form-details.component.html',
  styleUrls: ['./contact-form-details.component.scss']
})
export class ContactFormDetailsComponent {
  @Input() displayStyle = 'none';
  @Input() selectedContactForm: any = null;
  @Output() onClose = new EventEmitter();
  constructor(public _translateUtil: TranslateUtilService) { }
  //Methods
  close() {
    this.displayStyle = 'none';
    this.onClose.emit();
  }
}
