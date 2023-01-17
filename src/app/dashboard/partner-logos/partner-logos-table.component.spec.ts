import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerLogosTableComponent } from './partner-logos-table.component';

describe('PartnerLogosTableComponent', () => {
  let component: PartnerLogosTableComponent;
  let fixture: ComponentFixture<PartnerLogosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerLogosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerLogosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
