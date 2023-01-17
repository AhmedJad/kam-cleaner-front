import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AR_IMAGE, EN_IMAGE } from '../../shared/global';
import { AuthClientService } from '../../shared/services/clients/auth-client.service';
import { TokenService } from '../../shared/services/token.service';
import { TranslateUtilService } from '../../shared/services/translate-util.service';
import { PasswordMatchValdiator } from '../../shared/validators/password-match.validator';
const PASSWORD_PATTERN: any
  = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({});
  passwordHidden = true;
  emailExist = false;
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _authClient: AuthClientService,
    private _token: TokenService,
    public _translateUtil: TranslateUtilService,
    private _router: Router) {
  }
  //Accessors
  public get first_name() {
    return this.form.get("first_name") as AbstractControl;
  }
  public get last_name() {
    return this.form.get("last_name") as AbstractControl;
  }
  public get email() {
    return this.form.get("email") as AbstractControl;
  }
  public get phone() {
    return this.form.get("phone") as AbstractControl;
  }
  public get password() {
    return this.form.get("password") as AbstractControl;
  }
  public get password_confirmation() {
    return this.form.get("password_confirmation") as AbstractControl;
  }
  //Component lifecycle hook
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]],
      password: ["", [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      password_confirmation: ['', [Validators.required]]
    }, { validator: PasswordMatchValdiator });
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  public register() {
    this.emailExist = false;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._authClient.register(this.form.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        this._token.set(response.access_token);
        this._router.navigate(['/slider']);
      }, (errorResponse) => {
        console.log(errorResponse)
        this.emailExist = errorResponse.error.errors.email as boolean;
      })
  }
}
