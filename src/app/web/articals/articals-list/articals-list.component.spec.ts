import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticalsListComponent } from './articals-list.component';

describe('ArticalsListComponent', () => {
  let component: ArticalsListComponent;
  let fixture: ComponentFixture<ArticalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticalsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
