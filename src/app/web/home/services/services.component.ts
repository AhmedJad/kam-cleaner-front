import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServiceClientService } from 'src/app/shared/services/clients/service-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
declare var $: any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: any = [];
  limit = 3;
  private unsubscribeAll = new Subject();
  constructor(private _serviceClient: ServiceClientService,
    public _translateUtil: TranslateUtilService) {
  }
  ngOnInit(): void {
    this._serviceClient.getLatestServices(this.limit).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(services => {
        this.services = services;
      });
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
