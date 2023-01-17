import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountersTableComponent } from './counters-table.component';

describe('CountersTableComponent', () => {
  let component: CountersTableComponent;
  let fixture: ComponentFixture<CountersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
