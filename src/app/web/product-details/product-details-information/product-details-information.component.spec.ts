import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsInformationComponent } from './product-details-information.component';

describe('ProductDetailsInformationComponent', () => {
  let component: ProductDetailsInformationComponent;
  let fixture: ComponentFixture<ProductDetailsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
