import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersLogoComponent } from './partners-logo.component';

describe('PartnersLogoComponent', () => {
  let component: PartnersLogoComponent;
  let fixture: ComponentFixture<PartnersLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnersLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
