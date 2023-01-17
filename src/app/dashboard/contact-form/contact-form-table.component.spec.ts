import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormTableComponent } from './contact-form-table.component';

describe('ContactFormTableComponent', () => {
  let component: ContactFormTableComponent;
  let fixture: ComponentFixture<ContactFormTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactFormTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
