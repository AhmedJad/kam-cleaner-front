import { Component } from '@angular/core';
import { TranslateUtilService } from './shared/services/translate-util.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _translateUtil:TranslateUtilService){}
  ngOnInit() {
    this._translateUtil.changeLang(this._translateUtil.useSavedLang());

  }
}
