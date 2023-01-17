import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailsInformationComponent } from './article-details-information.component';

describe('ArticleDetailsInformationComponent', () => {
  let component: ArticleDetailsInformationComponent;
  let fixture: ComponentFixture<ArticleDetailsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleDetailsInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
