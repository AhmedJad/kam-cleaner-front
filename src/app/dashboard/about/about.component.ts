import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMPTY_IMAGE } from 'src/app/shared/global';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { AboutClientService } from 'src/app/shared/services/clients/about-client.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  imagePath: any = EMPTY_IMAGE;
  form: FormGroup = new FormGroup({});
  imageFile = '';
  invalidImage = false;
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _aboutClient: AboutClientService,
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
  get description_ar() {
    return this.form.get("description_ar");
  }
  get description_en() {
    return this.form.get("description_en");
  }
  get phone() {
    return this.form.get("phone");
  }
  get first_feature_ar() {
    return this.form.get("first_feature_ar");
  }
  get first_feature_en() {
    return this.form.get("first_feature_en");
  }
  get second_feature_ar() {
    return this.form.get("second_feature_ar");
  }
  get second_feature_en() {
    return this.form.get("second_feature_en");
  }
  get third_feature_ar() {
    return this.form.get("third_feature_ar");
  }
  get third_feature_en() {
    return this.form.get("third_feature_en");
  }
  get fourth_feature_ar() {
    return this.form.get("fourth_feature_ar");
  }
  get fourth_feature_en() {
    return this.form.get("fourth_feature_en");
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [null],
      title_ar: ['', Validators.required],
      title_en: ['', Validators.required],
      description_ar: ['', Validators.required],
      description_en: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]],
      first_feature_ar: ['', Validators.required],
      first_feature_en: ['', Validators.required],
      second_feature_ar: ['', Validators.required],
      second_feature_en: ['', Validators.required],
      third_feature_ar: ['', Validators.required],
      third_feature_en: ['', Validators.required],
      fourth_feature_ar: ['', Validators.required],
      fourth_feature_en: ['', Validators.required],
    });
    this._aboutClient.showFirst().pipe(takeUntil(this.unsubscribeAll))
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
    this.invalidImage = false;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.imageFile && !this.id?.value) {
      this._toastr.error(this._translateUtil.translate(["IMAGE", 'REQUIRED']),
        this._translate.instant("ERROR"));
      return
    }
    this._aboutClient.save(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((about: any) => {
        this.setFormFields(about);
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      }, error => this.invalidImage = error.error && error.error.errors && error.error.errors.image);
  }
  onFileChanged(event: any) {
    const files = event.target.files;
    this.imageFile = files[0];
    if (files.length === 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    }
  }
  private getFormData() {
    let formData = new FormData();
    if (this.id?.value) {
      formData.append("id", this.id?.value);
    }
    formData.append("title_ar", this.title_ar?.value);
    formData.append("title_en", this.title_en?.value);
    formData.append("description_ar", this.description_ar?.value);
    formData.append("description_en", this.description_en?.value);
    formData.append("phone", this.phone?.value);
    this.setFeaturesToFormData(formData);
    if (this.imageFile) {
      formData.append("image", this.imageFile);
    }
    return formData;
  }
  private setFeaturesToFormData(formData: any) {
    formData.append("features[0][context_ar]", this.first_feature_ar?.value);
    formData.append("features[0][context_en]", this.first_feature_en?.value);
    formData.append("features[1][context_ar]", this.second_feature_ar?.value);
    formData.append("features[1][context_en]", this.second_feature_en?.value);
    formData.append("features[2][context_ar]", this.third_feature_ar?.value);
    formData.append("features[2][context_en]", this.third_feature_en?.value);
    formData.append("features[3][context_ar]", this.fourth_feature_ar?.value);
    formData.append("features[3][context_en]", this.fourth_feature_en?.value);
  }
  private setFormFields(about: any) {
    if (about) {
      this.form.reset(about);
      this.imagePath = about.image;
      this.first_feature_ar?.setValue(about.features[0].context_ar);
      this.first_feature_en?.setValue(about.features[0].context_en);
      this.second_feature_ar?.setValue(about.features[1].context_ar);
      this.second_feature_en?.setValue(about.features[1].context_en);
      this.third_feature_ar?.setValue(about.features[2].context_ar);
      this.third_feature_en?.setValue(about.features[2].context_en);
      this.fourth_feature_ar?.setValue(about.features[3].context_ar);
      this.fourth_feature_en?.setValue(about.features[3].context_en);
    }
  }
}
