import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../../components/loader/loader.module';
import { ForgetPasswordComponent } from 'src/app/auth/forget-password/forget-password.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { ResetPasswordComponent } from 'src/app/auth/reset-password/reset-password.component';
import { NgModule } from '@angular/core';

let routes = [
  // {
  //   path: "",
  //   component: AuthComponent,
  //   children: [
  //     { path: "forget-password", component: ForgetPasswordComponent },
  //     { path: "reset-password/:token", component: ResetPasswordComponent },
  //     { path: "login", component: LoginComponent },
  //     { path: "register", component: RegisterComponent }
  //   ]
  // }
]

@NgModule({
  declarations: [
    AuthComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule,
    LoaderModule
  ]
})
export class AuthModule { }
