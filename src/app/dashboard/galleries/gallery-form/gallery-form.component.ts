import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMPTY_IMAGE } from 'src/app/shared/global';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
import { GalleryClientService } from 'src/app/shared/services/clients/gallery-client.service';

@Component({
  selector: 'gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
})
export class GalleryFormComponent implements OnInit {
  imagePath: any = EMPTY_IMAGE;
  imageFile = '';
  invalidImage = false;
  @Input() displayStyle = 'none';
  @Input() selectedGallery: any = null;
  @Output() onClose = new EventEmitter();
  @Output() saved = new EventEmitter();
  private unsubscribeAll = new Subject();
  constructor(
    private _galleryClient: GalleryClientService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    public _translateUtil: TranslateUtilService) { }
  ngOnInit(): void {
  }
  ngOnChanges() {
    if (this.selectedGallery) {
      this.imagePath = this.selectedGallery.id ? this.selectedGallery.image : EMPTY_IMAGE;
      this.imageFile = '';
    }
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  save() {
    if (!this.imageFile && !this.selectedGallery.id) {
      this._toastr.error(this._translateUtil.translate(["IMAGE", 'REQUIRED']),
        this._translate.instant("ERROR"));
      return
    }
    if (!this.selectedGallery.id) {
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
    this._galleryClient.store(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((gallery: any) => {
        this._toastr.success(this._translate.instant("CREATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        this.saved.emit([gallery, 'created']);
      }, (errorResponse) => {
        this.invalidImage = errorResponse.error && errorResponse.error.errors && errorResponse.error.errors.image
      })
  }
  private update() {
    this.invalidImage = false;
    this._galleryClient.update(this.getFormData()).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((gallery: any) => {
        gallery.index = this.selectedGallery.index;
        this.saved.emit([gallery, 'updated']);
        this._toastr.success(this._translate.instant("UPDATED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      }, (errorResponse) => {
        this.invalidImage = errorResponse.error && errorResponse.error.errors && errorResponse.error.errors.image
      })
  }
  private getFormData() {
    let formData = new FormData();
    if (this.selectedGallery.id) {
      formData.append("id", this.selectedGallery.id);
    }
    if (this.imageFile) {
      formData.append("image", this.imageFile);
    }
    return formData;
  }


}
