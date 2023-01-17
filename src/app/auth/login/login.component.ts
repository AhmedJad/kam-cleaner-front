import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AR_IMAGE, EN_IMAGE } from '../../shared/global';
import { TokenService } from '../../shared/services/token.service';
import { TranslateUtilService } from '../../shared/services/translate-util.service';
import { AuthClientService } from '../../shared/services/clients/auth-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  passwordHidden = true;
  form = new FormGroup({});
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _authClient: AuthClientService,
    private _token: TokenService,
    private _router: Router,
    private _toastr: ToastrService,
    private _translate: TranslateService,
    public _translateUtil: TranslateUtilService,
  ) { }
  //Accessors
  public get email() {
    return this.form.get("email");
  }
  public get password() {
    return this.form.get("password");
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      "email": ['', [Validators.required, Validators.email]],
      "password": ['', [Validators.required]]
    });
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  public login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._authClient.login(this.form.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        this._token.set(response.access_token);
        this._router.navigate(['/home']);
      }, (error) => {
        this._toastr.error(this._translate.instant("LOGIN_ERROR_MESSAGE"),
          this._translate.instant("ERROR")
        );
      })
  }
}
