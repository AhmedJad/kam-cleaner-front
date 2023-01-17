import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebDataService } from 'src/app/shared/layouts/web/web-data.service';
import { ContactFormClientService } from 'src/app/shared/services/clients/contact-form-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() product = null;
  contact = null;
  products = [];
  form;
  private unsubscribeAll = new Subject();
  constructor(public _translateUtil: TranslateUtilService,
    private _webData: WebDataService,
    private _formBuilder: FormBuilder,
    private _contactFormClient: ContactFormClientService,
    private _toaster: ToastrService,
    private _translate: TranslateService
  ) { }
  get name() {
    return this.form.get("name");
  }
  get phone() {
    return this.form.get("phone");
  }
  get email() {
    return this.form.get("email");
  }
  get subject() {
    return this.form.get("subject");
  }
  get message() {
    return this.form.get("message");
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]],
      message: [''],
    });
    this.getContact();
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  store() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._contactFormClient.store(this.form.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this._toaster.success(this._translate.instant("SEND_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        this.form.reset({
          name: '',
          phone: '',
          email: '',
          message: '',
        })
      });
  }
  //Commons
  private getContact() {
    this._webData.$contact.pipe(takeUntil(this.unsubscribeAll))
      .subscribe((contact: any) => {
        this.contact = contact;
      })
  }
}
