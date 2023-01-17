import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CounterClientService } from 'src/app/shared/services/clients/counter-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';
declare var $: any;
@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss']
})
export class CountersComponent implements OnInit {
  counters: any = [];
  limit = 4;
  private unsubscribeAll = new Subject();
  constructor(private _counterClient: CounterClientService,
    public _translateUtil:TranslateUtilService) { }
  ngOnInit(): void {
    this._counterClient.getLatestCounters(this.limit).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(counters => {
        this.counters = counters;
        setTimeout(()=>{
          if ($(".odometer").length) {
            var odo = $(".odometer");
            odo.each(function () {
              $(this).appear(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
              });
            });
          }
        },500)
      })
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
