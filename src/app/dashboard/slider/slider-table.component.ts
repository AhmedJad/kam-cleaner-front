import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SliderClientService } from '../../shared/services/clients/slider-client.service';
@Component({
  selector: 'slider-table',
  templateUrl: './slider-table.component.html',
  styleUrls: ['./slider-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderTableComponent implements OnInit {
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;
  sliderForm = 'none';
  deleteModal = 'none';
  selectedSlider: any = null;
  sliders: any[] = [];
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
  constructor(private _sliderClient: SliderClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getSlidersPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.page = 1;
        this.text = value;
        this.getSlidersPage();
      })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getSlidersPage();
  }
  onActionClicked(id: any, slider = null, index = 0) {
    if (id == "add") {
      this.sliderForm = 'block';
      this.selectedSlider = {};
    }
    else if (id == 'edit') {
      this.sliderForm = 'block';
      this.selectedSlider = slider;
      this.selectedSlider.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedSlider = slider;
      this.selectedSlider.index = index;
    }
  }
  onSliderSaved(event: any) {
    this.sliderForm = 'none';
    this.selectedSlider = event[0];
    if (event[1] == "created") {
      this.sliders.unshift(this.selectedSlider);
    }
    else {
      this.sliders[this.selectedSlider.index] = this.selectedSlider;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._sliderClient.delete(this.selectedSlider.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.sliders.splice(this.selectedSlider.index, 1);
        this.selectedSlider = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        if (this.sliders.length == 0) {
          if (this.page > 1) {
            this.page--;
          }
          this.getSlidersPage();
        }
      })
  }
  //Commons
  private getSlidersPage() {
    this._sliderClient.getPage(this.page, this.itemsPerPage, this.text).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((slidersPage: any) => {
        this.totalItems = slidersPage.total;
        this.sliders = slidersPage.data;
      })
  }
}
