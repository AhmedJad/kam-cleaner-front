import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsCounterComponent } from './about-us-counter.component';

describe('AboutUsCounterComponent', () => {
  let component: AboutUsCounterComponent;
  let fixture: ComponentFixture<AboutUsCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
