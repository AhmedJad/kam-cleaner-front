import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CounterClientService } from '../../shared/services/clients/counter-client.service';

@Component({
  selector: 'app-counters-table',
  templateUrl: './counters-table.component.html',
  styleUrls: ['./counters-table.component.scss']
})
export class CountersTableComponent implements OnInit {
  counterForm = 'none';
  deleteModal = 'none';
  selectedCounter: any = null;
  counters: any = [];
  actions = [
    { id: "add", icon: "fa fa-plus" },
  ];
  tableActions = [
    { id: "edit", icon: "fa fa-edit text-secondary" },
    { id: "delete", icon: "fa fa-trash text-secondary" },
  ];
  private unsubscribeAll = new Subject();
  constructor(private _counterClient: CounterClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getClients();
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onActionClicked(id: any, slider = null, index = 0) {
    if (id == "add") {
      this.counterForm = 'block';
      this.selectedCounter = {};
    }
    else if (id == 'edit') {
      this.counterForm = 'block';
      this.selectedCounter = slider;
      this.selectedCounter.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedCounter = slider;
      this.selectedCounter.index = index;
    }
  }
  onCounterSaved(event: any) {
    this.counterForm = 'none';
    this.selectedCounter = event[0];
    if (event[1] == "created") {
      this.counters.unshift(this.selectedCounter);
    }
    else {
      this.counters[this.selectedCounter.index] = this.selectedCounter;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._counterClient.delete(this.selectedCounter.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.counters.splice(this.selectedCounter.index, 1);
        this.selectedCounter = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      })
  }
  //Commons
  private getClients() {
    this._counterClient.getCounters().pipe(takeUntil(this.unsubscribeAll))
      .subscribe((clients: any) => {
        this.counters = clients;
      })
  }

}
