import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  @Input() contact:any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
