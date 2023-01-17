import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { CounterClientService } from '../../../shared/services/clients/counter-client.service';

@Component({
  selector: 'counter-form',
  templateUrl: './counters-form.component.html',
  styleUrls: ['./counters-form.component.scss']
})
export class CountersFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  titleArExist = false;
  titleEnExist = false;
  @Input() displayStyle = 'none';
  @Input() selectedCounter: any = null;
  @Output() onClose = new EventEmitter();
  @Output() saved = new EventEmitter();
  icons = ["icon-laundry-1", "icon-wipe", "icon-trophy", "icon-teamwork"];
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _counterService: CounterClientService,
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
  get icon() {
    return this.form.get("icon");
  }
  get counter() {
    return this.form.get("counter");
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [null],
      title_ar: ['', Validators.required],
      title_en: ['', Validators.required],
      icon: ['', Validators.required],
      counter: ['', Validators.required],
    });
  }
  ngOnChanges() {
    if (this.selectedCounter) {
      this.form.reset(this.selectedCounter);
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
    if (!this.selectedCounter.id) {
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
    this.titleArExist = false;
    this.titleEnExist = false;
    this._counterService.store(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
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
    this._counterService.update(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        service.index = this.selectedCounter.index;
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
    if (this.selectedCounter.id) {
      formData.append("id", this.selectedCounter.id);
    }
    formData.append("title_ar", this.title_ar?.value);
    formData.append("title_en", this.title_en?.value);
    formData.append("icon", this.icon?.value);
    formData.append("counter", this.counter?.value);
    return formData;
  }

}
