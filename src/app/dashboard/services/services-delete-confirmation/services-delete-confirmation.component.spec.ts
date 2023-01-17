import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesDeleteConfirmationComponent } from './services-delete-confirmation.component';

describe('ServicesDeleteConfirmationComponent', () => {
  let component: ServicesDeleteConfirmationComponent;
  let fixture: ComponentFixture<ServicesDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
