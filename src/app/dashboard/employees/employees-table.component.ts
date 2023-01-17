import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { EmployeeClientService } from '../../shared/services/clients/employee-client.service';

@Component({
  selector: 'employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class EmployeesTableComponent implements OnInit {
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;
  employeeForm = 'none';
  deleteModal = 'none';
  selectedEmployee: any = null;
  employees: any[] = [];
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
  constructor(private _employeeClient: EmployeeClientService,
    private _translate: TranslateService,
    private _toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getEmployeesPage();
    this.searchCtrl.valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.page = 1;
        this.text = value;
        this.getEmployeesPage();
      })
  }
  ngOnDestory() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  onPageChange(page: any) {
    this.page = page;
    this.getEmployeesPage();
  }
  onActionClicked(id: any, employee = null, index = 0) {
    if (id == "add") {
      this.employeeForm = 'block';
      this.selectedEmployee = {};
    }
    else if (id == 'edit') {
      this.employeeForm = 'block';
      this.selectedEmployee = employee;
      this.selectedEmployee.index = index;
    }
    else if (id == 'delete') {
      this.deleteModal = 'block';
      this.selectedEmployee = employee;
      this.selectedEmployee.index = index;
    }
  }
  onEmployeeSaved(event: any) {
    this.employeeForm = 'none';
    this.selectedEmployee = event[0];
    if (event[1] == "created") {
      this.employees.unshift(this.selectedEmployee);
    }
    else {
      this.employees[this.selectedEmployee.index] = this.selectedEmployee;
    }
  }
  delete() {
    this.deleteModal = 'none';
    this._employeeClient.delete(this.selectedEmployee.id).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.employees.splice(this.selectedEmployee.index, 1);
        this.selectedEmployee = null;
        this._toastr.success(this._translate.instant("DELETED_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
        if (this.employees.length == 0) {
          if (this.page > 1) {
            this.page--;
          }
          this.getEmployeesPage();
        }
      })
  }
  //Commons
  private getEmployeesPage() {
    this._employeeClient.getPage(this.page, this.itemsPerPage, this.text).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((employeesPage: any) => {
        this.totalItems = employeesPage.total;
        this.employees = employeesPage.data;
      })
  }
}
