import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMPTY_IMAGE } from 'src/app/shared/global';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { ProductClientService } from 'src/app/shared/services/clients/product-client.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  imagePath: any = EMPTY_IMAGE;
  form: FormGroup = new FormGroup({});
  imageFile = '';
  nameArExist = false;
  nameEnExist = false;
  invalidImage = false;
  icons = ["icon-plumbing", "icon-worker", "icon-laundry"
    , "icon-washing-plate", "icon-window-cleaner", "icon-sanitary"];
  @Input() displayStyle = 'none';
  @Input() selectedProduct: any = null;
  @Output() onClose = new EventEmitter();
  @Output() saved = new EventEmitter();
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _productClient: ProductClientService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    public _translateUtil: TranslateUtilService) { }

  get id() {
    return this.form.get("id");
  }
  get name_ar() {
    return this.form.get("name_ar");
  }
  get name_en() {
    return this.form.get("name_en");
  }
  get description_ar() {
    return this.form.get("description_ar");
  }
  get description_en() {
    return this.form.get("description_en");
  }
  get icon() {
    return this.form.get("icon");
  }
  get price() {
    return this.form.get("price");
  }
  get features(): any {
    return this.form.get("features");
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [null],
      name_ar: ['', Validators.required],
      name_en: ['', Validators.required],
      icon: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description_ar: ['', Validators.required],
      description_en: ['', Validators.required],
      features: this._formBuilder.array([])
    });
  }
  ngOnChanges() {
    if (this.selectedProduct) {
      this.imagePath = this.selectedProduct.id ? this.selectedProduct.image : EMPTY_IMAGE;
      this.imageFile = '';
      if (this.selectedProduct.features) {
        //Set features controls For Update
        this.form.setControl("features", this._formBuilder.array([]));
        this.selectedProduct.features.forEach((feature: any, index: any) => {
          this.addFeature();
        })
      }
      else {
        //Set features controls For Create
        this.form.setControl("features", this._formBuilder.array([this.getFeatureGroup()]));
      }
      this.form.reset(this.selectedProduct);
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
    if (!this.imageFile && !this.selectedProduct.id) {
      this._toastr.error(this._translateUtil.translate(["IMAGE", 'REQUIRED']),
        this._translate.instant("ERROR"));
      return
    }
    if (!this.selectedProduct.id) {
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
    this.nameArExist = false;
    this.nameEnExist = false;
    this.onClose.emit();
  }
  addFeature(event: any = null) {
    if (event) event.preventDefault();
    this.features.push(this.getFeatureGroup());
  }
  removeFeature(event: any, index: number) {
    event.preventDefault();
    this.features.removeAt(index);
  }
  //Commons
  private create() {
    this.invalidImage = false;
    this._productClient.store(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((product: any) => {
        this._toastr.success(this._translate.instant("CREATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        this.saved.emit([product, 'created']);
      }, (errorResponse) => {
        console.log(errorResponse);
        this.nameArExist = errorResponse.error.errors.name_ar as boolean;
        this.nameEnExist = errorResponse.error.errors.name_en as boolean;
        this.invalidImage = errorResponse.error && errorResponse.error.errors && errorResponse.error.errors.image
      })
  }
  private update() {
    this.invalidImage = false;
    this._productClient.update(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((product: any) => {
        product.index = this.selectedProduct.index;
        this.saved.emit([product, 'updated']);
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      }, (errorResponse) => {
        console.log(errorResponse);
        this.nameArExist = errorResponse.error.errors.name_ar as boolean;
        this.nameEnExist = errorResponse.error.errors.name_en as boolean;
        this.invalidImage = errorResponse.error && errorResponse.error.errors && errorResponse.error.errors.image
      })
  }
  private getFormData() {
    let formData = new FormData();
    if (this.selectedProduct.id) {
      formData.append("id", this.selectedProduct.id);
    }
    formData.append("name_ar", this.name_ar?.value);
    formData.append("name_en", this.name_en?.value);
    formData.append("icon", this.icon?.value);
    formData.append("price", this.price?.value);
    formData.append("description_ar", this.description_ar?.value);
    formData.append("description_en", this.description_en?.value);
    this.setFeaturesToFormData(formData);
    if (this.imageFile) {
      formData.append("image", this.imageFile);
    }
    return formData;
  }
  setFeaturesToFormData(formData: any) {
    this.features.controls.forEach((control: any, index: any) => {
      formData.append(`features[${index}][context_ar]`, control.get("context_ar").value);
      formData.append(`features[${index}][context_en]`, control.get("context_en").value);
    })
  }
  private getFeatureGroup(): FormGroup {
    return this._formBuilder.group({
      context_ar: ['', Validators.required],
      context_en: ['', Validators.required],
    });
  }
}
