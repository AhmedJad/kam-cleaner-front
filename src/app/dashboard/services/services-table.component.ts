import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServiceClientService } from '../../shared/services/clients/service-client.service';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss'],
})
export class ServicesTableComponent implements OnInit {
  serviceForm = 'none';
  deleteModal = 'none';
  selectedService: any = null;
  services: any = [];
  actions = [
    { id: "add", icon: "fa fa-plus" },
  ];
  tableActions = [
    { id: "edit", icon: "fa fa-edit text-secondary" },
    { id: "delete", icon: "fa fa-trash text-secondary" },
  ];
  private unsubscribeAll = new Subject();
  constructor(private _serviceClient: ServiceClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getServices();
  }
  ngOnDestory(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onActionClicked(id: any, slider = null, index = 0) {
    if (id == "add") {
      this.serviceForm = 'block';
      this.selectedService = {};
    }
    else if (id == 'edit') {
      this.serviceForm = 'block';
      this.selectedService = slider;
      this.selectedService.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedService = slider;
      this.selectedService.index = index;
    }
  }
  onServiceSaved(event: any) {
    this.serviceForm = 'none';
    this.selectedService = event[0];
    if (event[1] == "created") {
      this.services.unshift(this.selectedService);
    }
    else {
      this.services[this.selectedService.index] = this.selectedService;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._serviceClient.delete(this.selectedService.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.services.splice(this.selectedService.index, 1);
        this.selectedService = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      })
  }
  //Commons
  private getServices() {
    this._serviceClient.getServices().pipe(takeUntil(this.unsubscribeAll))
      .subscribe((services:any) => {
        this.services = services;
      })
  }
}
