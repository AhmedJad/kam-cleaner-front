import { TestBed } from '@angular/core/testing';

import { ArticleClientService } from './article-client.service';

describe('ArticleClientService', () => {
  let service: ArticleClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
