import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeClientService } from 'src/app/shared/services/clients/employee-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: any = [];
  limit = 4;
  private unsubscribeAll = new Subject();
  constructor(private _employeeClient: EmployeeClientService,
    public _translateUtil: TranslateUtilService) {
  }
  ngOnInit(): void {
    this._employeeClient.getLatestEmployees(this.limit).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(employees => {
        this.employees = employees;
      });
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
