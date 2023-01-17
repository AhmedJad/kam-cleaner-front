import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormDetailsComponent } from './contact-form-details.component';

describe('ContactFormDetailsComponent', () => {
  let component: ContactFormDetailsComponent;
  let fixture: ComponentFixture<ContactFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactFormDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
