import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { ClientService } from '../../../shared/services/clients/client.service';

@Component({
  selector: 'client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  nameArExist = false;
  nameEnExist = false;
  @Input() displayStyle = 'none';
  @Input() selectedClient: any = null;
  @Output() onClose = new EventEmitter();
  @Output() saved = new EventEmitter();
  icons = ["icon-plumbing", "icon-worker", "icon-laundry"
    , "icon-washing-plate", "icon-window-cleaner", "icon-sanitary"];
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _client: ClientService,
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
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [null],
      name_ar: ['', Validators.required],
      name_en: ['', Validators.required],
      description_ar: ['', Validators.required],
      description_en: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }
  ngOnChanges() {
    if (this.selectedClient) {
      this.form.reset(this.selectedClient);
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
    if (!this.selectedClient.id) {
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
    this.nameArExist = false;
    this.nameEnExist = false;
    this._client.store(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        this._toastr.success(this._translate.instant("CREATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        this.saved.emit([service, 'created']);
      }, (errorResponse) => {
        console.log(errorResponse)
        this.nameArExist = errorResponse.error.errors.name_ar as boolean;
        this.nameEnExist = errorResponse.error.errors.name_en as boolean;
      })
  }
  private update() {
    this.nameArExist = false;
    this.nameEnExist = false;
    this._client.update(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        service.index = this.selectedClient.index;
        this.saved.emit([service, 'updated']);
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      }, (errorResponse) => {
        this.nameArExist = errorResponse.error.errors.name_ar as boolean;
        this.nameEnExist = errorResponse.error.errors.name_en as boolean;
      })
  }
  private getFormData() {
    let formData = new FormData();
    if (this.selectedClient.id) {
      formData.append("id", this.selectedClient.id);
    }
    formData.append("name_ar", this.name_ar?.value);
    formData.append("name_en", this.name_en?.value);
    formData.append("description_ar", this.description_ar?.value);
    formData.append("description_en", this.description_en?.value);
    formData.append("icon", this.icon?.value);
    return formData;
  }

}
