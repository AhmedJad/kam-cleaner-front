import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMPTY_IMAGE } from 'src/app/shared/global';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { ReviewClientService } from '../../../shared/services/clients/review-client.service';

@Component({
  selector: 'review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {
  imagePath: any = EMPTY_IMAGE;
  form: FormGroup = new FormGroup({});
  imageFile = '';
  invalidImage = false;
  @Input() displayStyle = 'none';
  @Input() selectedReview: any = null;
  @Output() onClose = new EventEmitter();
  @Output() saved = new EventEmitter();
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _reviewClient: ReviewClientService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    public _translateUtil: TranslateUtilService) { }

  get id() {
    return this.form.get("id");
  }
  get name() {
    return this.form.get("name");
  }
  get job_ar() {
    return this.form.get("job_ar");
  }
  get job_en() {
    return this.form.get("job_en");
  }
  get review_ar() {
    return this.form.get("review_ar");
  }
  get review_en() {
    return this.form.get("review_en");
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      job_ar: ['', Validators.required],
      job_en: ['', Validators.required],
      review_ar: ['', Validators.required],
      review_en: ['', Validators.required],
    });
  }
  ngOnChanges() {
    if (this.selectedReview) {
      this.form.reset(this.selectedReview);
      this.imagePath = this.selectedReview.id ? this.selectedReview.image : EMPTY_IMAGE;
      this.imageFile = '';
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
    if (!this.imageFile && !this.selectedReview.id) {
      this._toastr.error(this._translateUtil.translate(["IMAGE", 'REQUIRED']),
        this._translate.instant("ERROR"));
      return
    }
    if (!this.selectedReview.id) {
      this.create();
    }
    else {
      this.update();
    }
  }
  onFileChanged(event: any) {
    const files = event.target.files;
    this.imageFile = files[0];
    if (files.length === 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
      console.log(reader.result)
    }
  }
  close() {
    this.displayStyle = 'none';
    this.invalidImage = false;
    this.onClose.emit();
  }
  //Commons
  private create() {
    this.invalidImage = false;
    this._reviewClient.store(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        this._toastr.success(this._translate.instant("CREATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        this.saved.emit([service, 'created']);
      }, (errorResponse) => {
        this.invalidImage = errorResponse.error.errors.image as boolean;
      })
  }
  private update() {
    this.invalidImage = false;
    this._reviewClient.update(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        service.index = this.selectedReview.index;
        this.saved.emit([service, 'updated']);
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      }, (errorResponse) => {
        this.invalidImage = errorResponse.error.errors.image as boolean;
      })
  }
  private getFormData() {
    let formData = new FormData();
    if (this.selectedReview.id) {
      formData.append("id", this.selectedReview.id);
    }
    formData.append("name", this.name?.value);
    formData.append("job_ar", this.job_ar?.value);
    formData.append("job_en", this.job_en?.value);
    formData.append("review_ar", this.review_ar?.value);
    formData.append("review_en", this.review_en?.value);
    if (this.imageFile) {
      formData.append("image", this.imageFile);
    }
    return formData;
  }
}
