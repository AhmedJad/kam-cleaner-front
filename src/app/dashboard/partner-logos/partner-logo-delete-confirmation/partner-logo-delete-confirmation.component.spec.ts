import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerLogoDeleteConfirmationComponent } from './partner-logo-delete-confirmation.component';

describe('PartnerLogoDeleteConfirmationComponent', () => {
  let component: PartnerLogoDeleteConfirmationComponent;
  let fixture: ComponentFixture<PartnerLogoDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerLogoDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerLogoDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
