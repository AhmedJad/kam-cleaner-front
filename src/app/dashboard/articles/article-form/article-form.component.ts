import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMPTY_IMAGE } from 'src/app/shared/global';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { ArticleClientService } from '../../../shared/services/clients/article-client.service';

@Component({
  selector: 'article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  imagePath: any = EMPTY_IMAGE;
  form: FormGroup = new FormGroup({});
  imageFile = '';
  titleArExist = false;
  titleEnExist = false;
  invalidImage = false;
  @Input() displayStyle = 'none';
  @Input() selectedArticle: any = null;
  @Output() onClose = new EventEmitter();
  @Output() saved = new EventEmitter();
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _articleClient: ArticleClientService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    public _translateUtil: TranslateUtilService) { }

  get id() {
    return this.form.get("id");
  }
  get title_ar() {
    return this.form.get("title_ar");
  }
  get title_en() {
    return this.form.get("title_en");
  }
  get subject_ar() {
    return this.form.get("subject_ar");
  }
  get subject_en() {
    return this.form.get("subject_en");
  }
  get description_ar() {
    return this.form.get("description_ar");
  }
  get description_en() {
    return this.form.get("description_en");
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [null],
      title_ar: ['', Validators.required],
      title_en: ['', Validators.required],
      subject_ar: ['', Validators.required],
      subject_en: ['', Validators.required],
      description_ar: ['', Validators.required],
      description_en: ['', Validators.required],
    });
  }
  ngOnChanges() {
    if (this.selectedArticle) {
      this.form.reset(this.selectedArticle);
      this.imagePath = this.selectedArticle.id ? this.selectedArticle.image : EMPTY_IMAGE;
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
    if (!this.imageFile && !this.selectedArticle.id) {
      this._toastr.error(this._translateUtil.translate(["IMAGE", 'REQUIRED']),
        this._translate.instant("ERROR"));
      return
    }
    if (!this.selectedArticle.id) {
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
    this.titleArExist = false;
    this.titleEnExist = false;
    this.onClose.emit();
  }
  //Commons
  private create() {
    this.titleArExist = false;
    this.titleEnExist = false;
    this.invalidImage = false;
    this._articleClient.store(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        this._toastr.success(this._translate.instant("CREATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        this.saved.emit([service, 'created']);
      }, (errorResponse) => {
        this.titleArExist = errorResponse.error.errors.title_ar as boolean;
        this.titleEnExist = errorResponse.error.errors.title_en as boolean;
        this.invalidImage = errorResponse.error.errors.image as boolean;
      })
  }
  private update() {
    this.titleArExist = false;
    this.titleEnExist = false;
    this.invalidImage = false;
    this._articleClient.update(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        service.index = this.selectedArticle.index;
        this.saved.emit([service, 'updated']);
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      }, (errorResponse) => {
        this.titleArExist = errorResponse.error.errors.title_ar as boolean;
        this.titleEnExist = errorResponse.error.errors.title_en as boolean;
        this.invalidImage = errorResponse.error.errors.image as boolean;
      })
  }
  private getFormData() {
    let formData = new FormData();
    if (this.selectedArticle.id) {
      formData.append("id", this.selectedArticle.id);
    }
    formData.append("title_ar", this.title_ar?.value);
    formData.append("title_en", this.title_en?.value);
    formData.append("subject_ar", this.subject_ar?.value);
    formData.append("subject_en", this.subject_en?.value);
    formData.append("description_ar", this.description_ar?.value);
    formData.append("description_en", this.description_en?.value);
    if (this.imageFile) {
      formData.append("image", this.imageFile);
    }
    return formData;
  }
}
