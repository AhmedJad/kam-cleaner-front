import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMPTY_IMAGE } from 'src/app/shared/global';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { PartnerLogoClientService } from '../../../shared/services/clients/partner-logo-client.service';

@Component({
  selector: 'partner-logo-form',
  templateUrl: './partner-logo-form.component.html',
  styleUrls: ['./partner-logo-form.component.scss']
})
export class PartnerLogoFormComponent implements OnInit {
  imagePath: any = EMPTY_IMAGE;
  imageFile = '';
  @Input() displayStyle = 'none';
  @Input() selectedLogo: any = null;
  @Output() onClose = new EventEmitter();
  @Output() saved = new EventEmitter();
  private unsubscribeAll = new Subject();
  constructor(
    private _partnerLogoClient: PartnerLogoClientService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    public _translateUtil: TranslateUtilService) { }
  ngOnInit(): void {
  }
  ngOnChanges() {
    if (this.selectedLogo) {
      this.imagePath = this.selectedLogo.id ? this.selectedLogo.image : EMPTY_IMAGE;
      this.imageFile = '';
    }
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  save() {
    if (!this.imageFile && !this.selectedLogo.id) {
      this._toastr.error(this._translateUtil.translate(["IMAGE", 'REQUIRED']),
        this._translate.instant("ERROR"));
      return
    }
    if (!this.selectedLogo.id) {
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
    this._partnerLogoClient.store(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        this._toastr.success(this._translate.instant("CREATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        this.saved.emit([service, 'created']);
      }, (errorResponse) => {
      })
  }
  private update() {
    this._partnerLogoClient.update(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((service: any) => {
        service.index = this.selectedLogo.index;
        this.saved.emit([service, 'updated']);
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      }, (errorResponse) => {
      })
  }
  private getFormData() {
    let formData = new FormData();
    if (this.selectedLogo.id) {
      formData.append("id", this.selectedLogo.id);
    }
    if (this.imageFile) {
      formData.append("image", this.imageFile);
    }
    return formData;
  }


}
