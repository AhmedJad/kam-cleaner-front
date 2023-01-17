import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsTableComponent } from './faqs-table.component';

describe('FaqsTableComponent', () => {
  let component: FaqsTableComponent;
  let fixture: ComponentFixture<FaqsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
