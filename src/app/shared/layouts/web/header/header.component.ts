import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AR_IMAGE, EN_IMAGE } from 'src/app/shared/global';
import { AuthClientService } from 'src/app/shared/services/clients/auth-client.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() contact: any = null;
  EN_IMAGE = EN_IMAGE;
  AR_IMAGE = AR_IMAGE;
  private unsubscribeAll = new Subject();
  constructor(
    public _translateUtil: TranslateUtilService,
    public _token: TokenService,
    private _router: Router,
    private _authClient: AuthClientService
  ) {
  }
  ngOnInit(): void {
    let lang = this._translateUtil.useSavedLang();
  }
  ngOnDestory() {

  }
  changeLang(event: any, lang: any) {
    event.preventDefault();
    this._translateUtil.changeLang(lang);
  }
  logout(event: any) {
    event.preventDefault();
    this._authClient.logout().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this._token.remove();
        this._router.navigate(["/home"]);
      });
  }
}
