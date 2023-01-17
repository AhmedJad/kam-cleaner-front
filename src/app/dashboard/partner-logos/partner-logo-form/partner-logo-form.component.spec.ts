import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerLogoFormComponent } from './partner-logo-form.component';

describe('PartnerLogoFormComponent', () => {
  let component: PartnerLogoFormComponent;
  let fixture: ComponentFixture<PartnerLogoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerLogoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerLogoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
