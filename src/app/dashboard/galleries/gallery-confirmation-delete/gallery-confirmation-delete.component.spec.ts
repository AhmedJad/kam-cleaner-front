import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryConfirmationDeleteComponent } from './gallery-confirmation-delete.component';

describe('GalleryConfirmationDeleteComponent', () => {
  let component: GalleryConfirmationDeleteComponent;
  let fixture: ComponentFixture<GalleryConfirmationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryConfirmationDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryConfirmationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
