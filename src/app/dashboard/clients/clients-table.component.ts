import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientService } from '../../shared/services/clients/client.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {
  clientForm = 'none';
  deleteModal = 'none';
  selectedClient: any = null;
  clients: any = [];
  actions = [
    { id: "add", icon: "fa fa-plus" },
  ];
  tableActions = [
    { id: "edit", icon: "fa fa-edit text-secondary" },
    { id: "delete", icon: "fa fa-trash text-secondary" },
  ];
  private unsubscribeAll = new Subject();
  constructor(private _client: ClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getClients();
  }
  ngOnDestory(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onActionClicked(id: any, slider = null, index = 0) {
    if (id == "add") {
      this.clientForm = 'block';
      this.selectedClient = {};
    }
    else if (id == 'edit') {
      this.clientForm = 'block';
      this.selectedClient = slider;
      this.selectedClient.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedClient = slider;
      this.selectedClient.index = index;
    }
  }
  onClientSaved(event: any) {
    this.clientForm = 'none';
    this.selectedClient = event[0];
    if (event[1] == "created") {
      this.clients.unshift(this.selectedClient);
    }
    else {
      this.clients[this.selectedClient.index] = this.selectedClient;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._client.delete(this.selectedClient.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.clients.splice(this.selectedClient.index, 1);
        this.selectedClient = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      })
  }
  //Commons
  private getClients() {
    this._client.getClients().pipe(takeUntil(this.unsubscribeAll))
      .subscribe((clients:any) => {
        this.clients = clients;
      })
  }
}
