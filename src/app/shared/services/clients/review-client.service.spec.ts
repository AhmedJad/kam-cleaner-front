import { TestBed } from '@angular/core/testing';

import { ReviewClientService } from './review-client.service';

describe('ReviewClientService', () => {
  let service: ReviewClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
