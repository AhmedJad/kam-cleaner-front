import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeClientService } from 'src/app/shared/services/clients/employee-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeesListComponent implements OnInit {
  page = 1;
  itemsPerPage = 6;
  totalItems = 0;
  employees = [];
  private unsubscribeAll = new Subject();
  constructor(private _employeeClient: EmployeeClientService,
    public _translateUtil: TranslateUtilService) { }

  ngOnInit(): void {
    this.getEmployeesPage();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getEmployeesPage();
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Commons
  private getEmployeesPage() {
    this._employeeClient.getPage(this.page, this.itemsPerPage).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((employeesPage: any) => {
        this.totalItems = employeesPage.total;
        this.employees = employeesPage.data;
      })
  }
}
