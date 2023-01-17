import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptors';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorService } from './shared/interceptors/token-interceptor.service';
import { AdminGuard } from './shared/guards/admin.guard';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

let routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: '', loadChildren: () => import("./shared/layouts/dashboard/dashboard.module")
      .then(m => m.DashboardModule),
    canActivate: [AdminGuard]
  },
  {
    path: '', loadChildren: () => import("./shared/layouts/web/web.module")
      .then(m => m.WebModule)
  },
  // {
  //   path: '', loadChildren: () => import("./shared/layouts/auth/auth.module")
  //     .then(m => m.AuthModule),
  //   canActivate: [GuestGuard]
  // },
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
