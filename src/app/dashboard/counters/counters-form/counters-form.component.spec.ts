import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountersFormComponent } from './counters-form.component';

describe('CountersFormComponent', () => {
  let component: CountersFormComponent;
  let fixture: ComponentFixture<CountersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
