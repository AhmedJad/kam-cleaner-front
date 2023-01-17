import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthClientService } from 'src/app/shared/services/clients/auth-client.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { PasswordMatchValdiator } from 'src/app/shared/validators/password-match.validator';
const PASSWORD_PATTERN: any
  = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  form = new FormGroup({});
  passwordHidden = true;
  private unsubscribeAll = new Subject();
  constructor(
    private _formBuilder: FormBuilder,
    private _authClient: AuthClientService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _token: TokenService,
    private _toast: ToastrService,
    private _translate: TranslateService) { }
  //Accessors
  public get password() {
    return this.form.get("password") as AbstractControl;
  }
  public get password_confirmation() {
    return this.form.get("password_confirmation") as AbstractControl;
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      token: [this._activatedRoute.snapshot.paramMap.get('token')],
      password: ["", [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      password_confirmation: ['', [Validators.required]]
    }, { validator: PasswordMatchValdiator });
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Method
  public resetPassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._authClient.resetPassword(this.form.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response: any) => {
        this._token.set(response.access_token);
        this._router.navigate(['/home']);
      }, (error) => {
        if (error.status == 400) {
          this._toast.error(this._translate.instant("TOKEN_IS_NOT_VALID"),
            this._translate.instant("ERROR"));
        }
      })
  }
}
