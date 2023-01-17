import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMPTY_IMAGE } from 'src/app/shared/global';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { ServiceClientService } from '../../../shared/services/clients/service-client.service';

@Component({
  selector: 'services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss']
})
export class ServicesFormComponent implements OnInit {
  imagePath: any = EMPTY_IMAGE;
  form: FormGroup = new FormGroup({});
  imageFile = '';
  titleArExist = false;
  titleEnExist = false;
  @Input() displayStyle = 'none';
  @Input() selectedService: any = null;
  @Output() onClose = new EventEmitter();
  @Output() saved = new EventEmitter();
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _serviceClient: ServiceClientService,
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
  get url() {
    return this.form.get("url");
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [null],
      title_ar: ['', Validators.required],
      title_en: ['', Validators.required],
      description_ar: ['', Validators.required],
      description_en: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
    });
  }
  ngOnChanges() {
    if (this.selectedService) {
      this.form.reset(this.selectedService);
      this.imagePath = this.selectedService.id ? this.selectedService.image : EMPTY_IMAGE;
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
    if (!this.imageFile && !this.selectedService.id) {
      this._toastr.error(this._translateUtil.translate(["IMAGE", 'REQUIRED']),
        this._translate.instant("ERROR"));
      return
    }
    if (!this.selectedService.id) {
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
    this.onClose.emit();
  }
  //Commons
  private create() {
    this.titleArExist = false;
    this.titleEnExist = false;
    this._serviceClient.store(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        this._toastr.success(this._translate.instant("CREATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        this.saved.emit([service, 'created']);
      }, (errorResponse) => {
        this.titleArExist = errorResponse.error.errors.title_ar as boolean;
        this.titleEnExist = errorResponse.error.errors.title_en as boolean;
      })
  }
  private update() {
    this.titleArExist = false;
    this.titleEnExist = false;
    this._serviceClient.update(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        service.index = this.selectedService.index;
        this.saved.emit([service, 'updated']);
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      }, (errorResponse) => {
        this.titleArExist = errorResponse.error.errors.title_ar as boolean;
        this.titleEnExist = errorResponse.error.errors.title_en as boolean;
      })
  }
  private getFormData() {
    let formData = new FormData();
    if (this.selectedService.id) {
      formData.append("id", this.selectedService.id);
    }
    formData.append("title_ar", this.title_ar?.value);
    formData.append("title_en", this.title_en?.value);
    formData.append("description_ar", this.description_ar?.value);
    formData.append("description_en", this.description_en?.value);
    formData.append("url", this.url?.value);
    if (this.imageFile) {
      formData.append("image", this.imageFile);
    }
    return formData;
  }

}
