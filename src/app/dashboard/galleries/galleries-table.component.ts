import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { GalleryClientService } from 'src/app/shared/services/clients/gallery-client.service';

@Component({
  selector: 'galleries-table',
  templateUrl: './galleries-table.component.html',
  styleUrls: ['./galleries-table.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class GalleriesTableComponent implements OnInit {
  page = 1;
  itemsPerPage = 5;
  totalItems = 0;
  galleryForm = 'none';
  deleteModal = 'none';
  selectedGallery: any = null;
  galleries: any[] = [];
  text = '';
  searchCtrl = new FormControl();
  actions = [
    { id: "add", icon: "fa fa-plus" },
  ];
  tableActions = [
    { id: "edit", icon: "fa fa-edit text-secondary" },
    { id: "delete", icon: "fa fa-trash text-secondary" },
  ];
  private unsubscribeAll = new Subject();
  constructor(private _galleryClient: GalleryClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getGalleriesPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.text = value;
        this.getGalleriesPage();
      })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getGalleriesPage();
  }
  onActionClicked(id: any, slider = null, index = 0) {
    if (id == "add") {
      this.galleryForm = 'block';
      this.selectedGallery = {};
    }
    else if (id == 'edit') {
      this.galleryForm = 'block';
      this.selectedGallery = slider;
      this.selectedGallery.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedGallery = slider;
      this.selectedGallery.index = index;
    }
  }
  onGallerySaved(event: any) {
    this.galleryForm = 'none';
    this.selectedGallery = event[0];
    if (event[1] == "created") {
      this.galleries.unshift(this.selectedGallery);
    }
    else {
      this.galleries[this.selectedGallery.index] = this.selectedGallery;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._galleryClient.delete(this.selectedGallery.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.galleries.splice(this.selectedGallery.index, 1);
        this.selectedGallery = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        if (this.galleries.length == 0) {
          if (this.page > 1) {
            this.page--;
          }
          this.getGalleriesPage();
        }
      })
  }
  //Commons
  private getGalleriesPage() {
    this._galleryClient.getPage(this.page, this.itemsPerPage, this.text).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((galleriesPage: any) => {
        this.totalItems = galleriesPage.total;
        this.galleries = galleriesPage.data;
      })
  }
}
