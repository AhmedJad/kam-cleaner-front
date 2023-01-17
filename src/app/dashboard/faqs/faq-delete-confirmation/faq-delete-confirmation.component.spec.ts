import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqDeleteConfirmationComponent } from './faq-delete-confirmation.component';

describe('FaqDeleteConfirmationComponent', () => {
  let component: FaqDeleteConfirmationComponent;
  let fixture: ComponentFixture<FaqDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
