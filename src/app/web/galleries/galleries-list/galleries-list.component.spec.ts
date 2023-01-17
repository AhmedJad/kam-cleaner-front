import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriesListComponent } from './galleries-list.component';

describe('GalleriesListComponent', () => {
  let component: GalleriesListComponent;
  let fixture: ComponentFixture<GalleriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
