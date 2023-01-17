import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-alert',
  templateUrl: './payment-alert.component.html',
  styleUrls: ['./payment-alert.component.scss']
})
export class PaymentAlertComponent implements OnInit {
  constructor(public _router: Router) { }
  ngOnInit(): void {
  }

}
