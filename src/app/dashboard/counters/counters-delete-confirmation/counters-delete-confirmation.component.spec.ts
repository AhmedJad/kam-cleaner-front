import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountersDeleteConfirmationComponent } from './counters-delete-confirmation.component';

describe('CountersDeleteConfirmationComponent', () => {
  let component: CountersDeleteConfirmationComponent;
  let fixture: ComponentFixture<CountersDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountersDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountersDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
