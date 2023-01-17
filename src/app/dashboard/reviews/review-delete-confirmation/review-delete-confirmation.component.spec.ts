import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDeleteConfirmationComponent } from './review-delete-confirmation.component';

describe('ReviewDeleteConfirmationComponent', () => {
  let component: ReviewDeleteConfirmationComponent;
  let fixture: ComponentFixture<ReviewDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
