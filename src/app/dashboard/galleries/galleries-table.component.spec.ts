import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriesTableComponent } from './galleries-table.component';

describe('GalleriesTableComponent', () => {
  let component: GalleriesTableComponent;
  let fixture: ComponentFixture<GalleriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleriesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
