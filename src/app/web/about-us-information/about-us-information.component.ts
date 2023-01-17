import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AboutClientService } from 'src/app/shared/services/clients/about-client.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-about-us-information',
  templateUrl: './about-us-information.component.html',
  styleUrls: ['./about-us-information.component.scss']
})
export class AboutUsInformationComponent implements OnInit {
  about: any = null;
  private unsubscribeAll = new Subject();
  constructor(private _aboutClient: AboutClientService,
    public _translateUtil: TranslateUtilService) {
  }
  ngOnInit(): void {
    this._aboutClient.showFirst().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(about => {
        this.about = about;
      });
  }
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
