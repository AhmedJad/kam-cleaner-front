import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GalleryClientService } from 'src/app/shared/services/clients/gallery-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-galleries-list',
  templateUrl: './galleries-list.component.html',
  styleUrls: ['./galleries-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class GalleriesListComponent implements OnInit {
  page = 1;
  itemsPerPage = 6;
  totalItems = 0;
  galleries = [];
  private unsubscribeAll = new Subject();
  constructor(private _galleryClient: GalleryClientService,
    public _translateUtil: TranslateUtilService) { }

  ngOnInit(): void {
    this.getGalleriesPage();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getGalleriesPage();
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Commons
  private getGalleriesPage() {
    this._galleryClient.getPage(this.page, this.itemsPerPage).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((galleriesPage: any) => {
        this.totalItems = galleriesPage.total;
        this.galleries = galleriesPage.data;
      })
  }
}
