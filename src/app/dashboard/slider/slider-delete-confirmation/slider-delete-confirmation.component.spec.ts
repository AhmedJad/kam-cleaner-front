import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDeleteConfirmationComponent } from './slider-delete-confirmation.component';

describe('DeleteConfirmationComponent', () => {
  let component: SliderDeleteConfirmationComponent;
  let fixture: ComponentFixture<SliderDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
