import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoaderModule } from '../../components/loader/loader.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SliderFormComponent } from 'src/app/dashboard/slider/slider-form/slider-form.component';
import { SliderDeleteConfirmationComponent } from 'src/app/dashboard/slider/slider-delete-confirmation/slider-delete-confirmation.component';
import { SliderTableComponent } from 'src/app/dashboard/slider/slider-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesFormComponent } from 'src/app/dashboard/services/services-form/services-form.component';
import { ServicesDeleteConfirmationComponent } from 'src/app/dashboard/services/services-delete-confirmation/services-delete-confirmation.component';
import { ServicesTableComponent } from 'src/app/dashboard/services/services-table.component';
import { AboutComponent } from 'src/app/dashboard/about/about.component';
import { ClientDeleteConfirmationComponent } from 'src/app/dashboard/clients/client-delete-confirmation/client-delete-confirmation.component';
import { ClientFormComponent } from 'src/app/dashboard/clients/client-form/client-form.component';
import { ClientsTableComponent } from 'src/app/dashboard/clients/clients-table.component';
import { CountersTableComponent } from 'src/app/dashboard/counters/counters-table.component';
import { CountersFormComponent } from 'src/app/dashboard/counters/counters-form/counters-form.component';
import { CountersDeleteConfirmationComponent } from 'src/app/dashboard/counters/counters-delete-confirmation/counters-delete-confirmation.component';
import { EmployeesTableComponent } from 'src/app/dashboard/employees/employees-table.component';
import { EmployeeFormComponent } from 'src/app/dashboard/employees/employee-form/employee-form.component';
import { EmployeeDeleteConfirmationComponent } from 'src/app/dashboard/employees/employee-delete-confirmation/employee-delete-confirmation.component';
import { ReviewsTableComponent } from 'src/app/dashboard/reviews/reviews-table.component';
import { ReviewFormComponent } from 'src/app/dashboard/reviews/review-form/review-form.component';
import { ReviewDeleteConfirmationComponent } from 'src/app/dashboard/reviews/review-delete-confirmation/review-delete-confirmation.component';
import { PartnerLogoFormComponent } from 'src/app/dashboard/partner-logos/partner-logo-form/partner-logo-form.component';
import { PartnerLogoDeleteConfirmationComponent } from 'src/app/dashboard/partner-logos/partner-logo-delete-confirmation/partner-logo-delete-confirmation.component';
import { PartnerLogosTableComponent } from 'src/app/dashboard/partner-logos/partner-logos-table.component';
import { ArticleFormComponent } from 'src/app/dashboard/articles/article-form/article-form.component';
import { ArticleDeleteConfirmationComponent } from 'src/app/dashboard/articles/article-delete-confirmation/article-delete-confirmation.component';
import { ArticlesTableComponent } from 'src/app/dashboard/articles/articles-table.component';
import { ContactComponent } from 'src/app/dashboard/contact/contact.component';
import { GalleryFormComponent } from 'src/app/dashboard/galleries/gallery-form/gallery-form.component';
import { GalleryConfirmationDeleteComponent } from 'src/app/dashboard/galleries/gallery-confirmation-delete/gallery-confirmation-delete.component';
import { GalleriesTableComponent } from 'src/app/dashboard/galleries/galleries-table.component';
import { FaqsTableComponent } from 'src/app/dashboard/faqs/faqs-table.component';
import { FaqFormComponent } from 'src/app/dashboard/faqs/faq-form/faq-form.component';
import { FaqDeleteConfirmationComponent } from 'src/app/dashboard/faqs/faq-delete-confirmation/faq-delete-confirmation.component';
import { ProductsTableComponent } from 'src/app/dashboard/products/products-table.component';
import { ProductFormComponent } from 'src/app/dashboard/products/product-form/product-form.component';
import { ProductDeleteConfirmationComponent } from 'src/app/dashboard/products/product-delete-confirmation/product-delete-confirmation.component';
import { ContactFormTableComponent } from 'src/app/dashboard/contact-form/contact-form-table.component';
import { ContactFormDetailsComponent } from 'src/app/dashboard/contact-form/contact-form-details/contact-form-details.component';
import { OrdersComponent } from 'src/app/dashboard/orders/orders.component';
import { OrdersDetailsComponent } from 'src/app/dashboard/orders/orders-details/orders-details.component';

let routes = [{
  path: "",
  component: DashboardComponent,
  children: [
    { path: "slider", component: SliderTableComponent },
    { path: "services", component: ServicesTableComponent },
    { path: "about", component: AboutComponent },
    { path: "clients", component: ClientsTableComponent },
    { path: "counters", component: CountersTableComponent },
    { path: "employees", component: EmployeesTableComponent },
    { path: "reviews", component: ReviewsTableComponent },
    { path: "partner-logos", component: PartnerLogosTableComponent },
    { path: "articles", component: ArticlesTableComponent },
    { path: "contact-us", component: ContactComponent },
    { path: "galleries", component: GalleriesTableComponent },
    { path: "faqs", component: FaqsTableComponent },
    { path: "products", component: ProductsTableComponent },
    { path: "contact-form", component: ContactFormTableComponent },
    { path: "orders", component: OrdersComponent },
  ]
}];


@NgModule({
  declarations: [
    DashboardComponent,
    SliderFormComponent,
    SliderDeleteConfirmationComponent,
    SliderTableComponent,
    ServicesTableComponent,
    ServicesFormComponent,
    ServicesDeleteConfirmationComponent,
    AboutComponent,
    ClientsTableComponent,
    ClientDeleteConfirmationComponent,
    ClientFormComponent,
    CountersTableComponent,
    CountersFormComponent,
    CountersDeleteConfirmationComponent,
    EmployeesTableComponent,
    EmployeeFormComponent,
    EmployeeDeleteConfirmationComponent,
    ReviewsTableComponent,
    ReviewFormComponent,
    ReviewDeleteConfirmationComponent,
    PartnerLogosTableComponent,
    PartnerLogoFormComponent,
    PartnerLogoDeleteConfirmationComponent,
    ArticlesTableComponent,
    ArticleFormComponent,
    ArticleDeleteConfirmationComponent,
    ContactComponent,
    GalleriesTableComponent,
    GalleryFormComponent,
    GalleryConfirmationDeleteComponent,
    FaqsTableComponent,
    FaqFormComponent,
    FaqDeleteConfirmationComponent,
    ProductsTableComponent,
    ProductFormComponent,
    ProductDeleteConfirmationComponent,
    ContactFormTableComponent,
    ContactFormDetailsComponent,
    OrdersComponent,
    OrdersDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    LoaderModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
