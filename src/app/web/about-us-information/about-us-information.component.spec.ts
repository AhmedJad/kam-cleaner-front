import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsInformationComponent } from './about-us-information.component';

describe('AboutUsInformationComponent', () => {
  let component: AboutUsInformationComponent;
  let fixture: ComponentFixture<AboutUsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
