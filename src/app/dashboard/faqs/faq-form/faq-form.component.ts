import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMPTY_IMAGE } from 'src/app/shared/global';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { FaqClientService } from '../../../shared/services/clients/faq-client.service';

@Component({
  selector: 'faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.scss']
})
export class FaqFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  @Input() displayStyle = 'none';
  @Input() selectedFaq: any = null;
  @Output() onClose = new EventEmitter();
  @Output() saved = new EventEmitter();
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _faqClient: FaqClientService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    public _translateUtil: TranslateUtilService) { }

  get id() {
    return this.form.get("id");
  }
  get question_ar() {
    return this.form.get("question_ar");
  }
  get question_en() {
    return this.form.get("question_en");
  }
  get answer_ar() {
    return this.form.get("answer_ar");
  }
  get answer_en() {
    return this.form.get("answer_en");
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [null],
      question_ar: ['', Validators.required],
      question_en: ['', Validators.required],
      answer_ar: ['', Validators.required],
      answer_en: ['', Validators.required],
    });
  }
  ngOnChanges() {
    if (this.selectedFaq) {
      this.form.reset(this.selectedFaq);
    }
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
    if (!this.selectedFaq.id) {
      this.create();
    }
    else {
      this.update();
    }
  }
  close() {
    this.displayStyle = 'none';
    this.onClose.emit();
  }
  //Commons
  private create() {
    this._faqClient.store(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((faq: any) => {
        this._toastr.success(this._translate.instant("CREATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        this.saved.emit([faq, 'created']);
      }, (errorResponse) => {
      })
  }
  private update() {
    this._faqClient.update(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((faq: any) => {
        faq.index = this.selectedFaq.index;
        this.saved.emit([faq, 'updated']);
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      }, (errorResponse) => {
      })
  }
  private getFormData() {
    let formData = new FormData();
    if (this.selectedFaq.id) {
      formData.append("id", this.selectedFaq.id);
    }
    formData.append("question_ar", this.question_ar?.value);
    formData.append("question_en", this.question_en?.value);
    formData.append("answer_ar", this.answer_ar?.value);
    formData.append("answer_en", this.answer_en?.value);
    return formData;
  }
}
