import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDeleteConfirmationComponent } from './article-delete-confirmation.component';

describe('ArticleDeleteConfirmationComponent', () => {
  let component: ArticleDeleteConfirmationComponent;
  let fixture: ComponentFixture<ArticleDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
