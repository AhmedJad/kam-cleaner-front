import { Component, OnInit } from '@angular/core';
import { AR_IMAGE, EN_IMAGE } from '../../global';
import { TranslateUtilService } from '../../services/translate-util.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  AR_IMAGE = AR_IMAGE;
  EN_IMAGE = EN_IMAGE;
  constructor(public _translateUtil: TranslateUtilService) { }
  ngOnInit(): void {
    this._translateUtil.changeLang(this._translateUtil.useSavedLang());
  }
  //Methods
  changeLang(event: any, lang: any) {
    event.preventDefault();
    this._translateUtil.changeLang(lang);
  }
}
