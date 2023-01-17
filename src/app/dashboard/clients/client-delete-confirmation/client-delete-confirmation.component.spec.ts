import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeleteConfirmationComponent } from './client-delete-confirmation.component';

describe('ClientDeleteConfirmationComponent', () => {
  let component: ClientDeleteConfirmationComponent;
  let fixture: ComponentFixture<ClientDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
