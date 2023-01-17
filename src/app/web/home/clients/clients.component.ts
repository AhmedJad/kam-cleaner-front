import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientService } from 'src/app/shared/services/clients/client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: any = [];
  limit = 6;
  private unsubscribeAll = new Subject();
  constructor(private _client: ClientService,
    public _translateUtil: TranslateUtilService) {
  }
  ngOnInit(): void {
    this._client.getLatestClients(this.limit).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(clients => {
        this.clients = clients;
      });
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
