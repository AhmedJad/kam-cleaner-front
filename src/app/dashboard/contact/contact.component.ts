import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { ContactClientService } from '../../shared/services/clients/contact-client.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _contactClient: ContactClientService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    public _translateUtil: TranslateUtilService) { }

  get id() {
    return this.form.get("id");
  }
  get email() {
    return this.form.get("email");
  }
  get first_phone() {
    return this.form.get("first_phone");
  }
  get second_phone() {
    return this.form.get("second_phone");
  }
  get last_phone() {
    return this.form.get("last_phone");
  }
  get address() {
    return this.form.get("address");
  }
  get working_days_ar() {
    return this.form.get("working_days_ar");
  }
  get working_days_en() {
    return this.form.get("working_days_en");
  }
  get working_hours_ar() {
    return this.form.get("working_hours_ar");
  }
  get working_hours_en() {
    return this.form.get("working_hours_en");
  }
  get facebook() {
    return this.form.get("facebook");
  }
  get twitter() {
    return this.form.get("twitter");
  }
  get youtube() {
    return this.form.get("youtube");
  }
  get instgram() {
    return this.form.get("instgram");
  }
  get linked_in() {
    return this.form.get("linked_in");
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [null],
      email: ['', [Validators.required, Validators.email]],
      first_phone: ['', [Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]],
      second_phone: ['', [Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]],
      last_phone: ['', [Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]],
      address: ['', Validators.required],
      working_days_ar: ['', Validators.required],
      working_days_en: ['', Validators.required],
      working_hours_ar: ['', Validators.required],
      working_hours_en: ['', Validators.required],
      facebook: ['', [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
      twitter: ['', [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
      youtube: ['', [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
      instgram: ['', [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
      linked_in: ['', [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
    });
    this._contactClient.showFirst().pipe(takeUntil(this.unsubscribeAll))
      .subscribe((about: any) => {
        this.setFormFields(about);
      })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._contactClient.save(this.form.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((about: any) => {
        this.setFormFields(about);
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      });
  }
  private setFormFields(contact: any) {
    if (contact) {
      this.form.reset(contact);
    }
  }
}
