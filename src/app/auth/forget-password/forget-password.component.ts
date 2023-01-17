import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthClientService } from 'src/app/shared/services/clients/auth-client.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TranslateUtilService } from 'src/app/shared/services/translate-util.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  form = new FormGroup({});
  emailNotFound = false;
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _authClient: AuthClientService,
    private _toast: ToastrService,
    private _translate: TranslateService,
    public _translateUtil: TranslateUtilService) {
  }
  public get email() {
    return this.form.get("email") as AbstractControl;
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      "email": ['', [Validators.required, Validators.email]]
    });
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  public forgetPassword() {
    this.emailNotFound = false;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._authClient.forgetPassword(this.email.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this._toast.success(this._translate.instant("EMAIL_SENT_SUCCESSFULLY"),
          this._translate.instant("SUCCESS"));
      }, (error) => {
        if (error.status == 404) {
          this.emailNotFound = true;
        }
      })
  }
}
