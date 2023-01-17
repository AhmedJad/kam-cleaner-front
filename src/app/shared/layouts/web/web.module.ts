import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponent } from './web.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/web/home/home.component';
import { HeaderComponent } from './header/header.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { InformationComponent } from './information/information.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ServicesComponent } from 'src/app/web/home/services/services.component';
import { ClientsComponent } from 'src/app/web/home/clients/clients.component';
import { EmployeesComponent } from 'src/app/web/employees/employees.component';
import { AboutUsComponent } from 'src/app/web/about-us/about-us.component';
import { PageHeaderComponent } from 'src/app/web/page-header/page-header.component';
import { AboutUsInformationComponent } from 'src/app/web/about-us-information/about-us-information.component';
import { ProductsComponent } from 'src/app/web/products/products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsListComponent } from 'src/app/web/products/products-list/products-list.component';
import { ProductDetailsComponent } from 'src/app/web/product-details/product-details.component';
import { ProductDetailsInformationComponent } from 'src/app/web/product-details/product-details-information/product-details-information.component';
import { EmployeesListComponent } from 'src/app/web/employees-page/employees-list/employees-list.component';
import { EmployeesPageComponent } from 'src/app/web/employees-page/employees-page.component';
import { GalleriesListComponent } from 'src/app/web/galleries/galleries-list/galleries-list.component';
import { GalleriesComponent } from 'src/app/web/galleries/galleries.component';
import { ContactUsComponent } from 'src/app/web/contact-us/contact-us.component';
import { FaqsListComponent } from 'src/app/web/faqs/faqs-list/faqs-list.component';
import { FaqsComponent } from 'src/app/web/faqs/faqs.component';
import { ArticalsComponent } from 'src/app/web/articals/articals.component';
import { ArticalsListComponent } from 'src/app/web/articals/articals-list/articals-list.component';
import { ArticleDetailsInformationComponent } from 'src/app/web/article-details/article-details-information/article-details-information.component';
import { ArticleDetailsComponent } from 'src/app/web/article-details/article-details.component';
import { ContactFormComponent } from 'src/app/web/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CountersComponent } from 'src/app/web/home/counters/counters.component';
import { AboutUsCounterComponent } from 'src/app/web/about-us/about-us-counter/about-us-counter.component';
import { SlidersComponent } from 'src/app/web/home/sliders/sliders.component';
import { PartnersLogoComponent } from 'src/app/web/home/partners-logo/partners-logo.component';
import { ArticlesSliderComponent } from 'src/app/web/home/articles-slider/articles-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReviewsSliderComponent } from 'src/app/web/home/reviews-slider/reviews-slider.component';
import { CartComponent } from 'src/app/web/cart/cart.component';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { OrderSuccessComponent } from 'src/app/web/order-success/order-success.component';
import { OrderErrorComponent } from 'src/app/web/order-error/order-error.component';
import { UserOrdersComponent } from 'src/app/web/user-orders/user-orders.component';
import { ForgetPasswordComponent } from 'src/app/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from 'src/app/auth/reset-password/reset-password.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { GuestGuard } from '../../guards/guest.guard';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { PaymentAlertComponent } from 'src/app/web/cart/payment-alert/payment-alert.component';
import { LoaderModule } from '../../components/loader/loader.module';
let routes = [{
  path: "",
  component: WebComponent,
  children: [
    { path: "about-us", component: AboutUsComponent },
    { path: "home", component: HomeComponent },
    { path: "products-list", component: ProductsComponent },
    { path: "products-list/:id", component: ProductDetailsComponent },
    { path: "employees-list", component: EmployeesPageComponent },
    { path: "galleries-list", component: GalleriesComponent },
    { path: "contact-us-info", component: ContactUsComponent },
    { path: "faqs-list", component: FaqsComponent },
    { path: "articals-list", component: ArticalsComponent },
    { path: "articals-list/:id", component: ArticleDetailsComponent },
    { path: "order-success", component: OrderSuccessComponent },
    { path: "order-error", component: OrderErrorComponent },
    {
      path: "", canActivate: [AuthenticatedGuard], children: [
        { path: "cart", component: CartComponent, },
        { path: "user-orders", component: UserOrdersComponent },

      ]
    },
    {
      path: "", canActivate: [GuestGuard], children: [
        { path: "cart", component: CartComponent, },
        { path: "user-orders", component: UserOrdersComponent },
        { path: "forget-password", component: ForgetPasswordComponent },
        { path: "reset-password/:token", component: ResetPasswordComponent },
        { path: "login", component: LoginComponent },
        { path: "register", component: RegisterComponent }
      ]
    },
  ]
}];

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    ResetPasswordComponent,
    LoginComponent,
    RegisterComponent,
    WebComponent,
    HeaderComponent,
    GoogleMapComponent,
    InformationComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    ClientsComponent,
    EmployeesComponent,
    AboutUsComponent,
    PageHeaderComponent,
    AboutUsInformationComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    ProductDetailsInformationComponent,
    EmployeesPageComponent,
    EmployeesListComponent,
    GalleriesComponent,
    GalleriesListComponent,
    ContactUsComponent,
    FaqsListComponent,
    FaqsComponent,
    ArticalsComponent,
    ArticalsListComponent,
    ArticleDetailsComponent,
    ArticleDetailsInformationComponent,
    ContactFormComponent,
    CountersComponent,
    AboutUsCounterComponent,
    SlidersComponent,
    PartnersLogoComponent,
    ArticlesSliderComponent,
    ReviewsSliderComponent,
    CartComponent,
    OrderSuccessComponent,
    OrderErrorComponent,
    UserOrdersComponent,
    PaymentAlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CarouselModule,
    LoaderModule
  ]
})
export class WebModule { }
