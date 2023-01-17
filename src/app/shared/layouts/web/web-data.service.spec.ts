import { TestBed } from '@angular/core/testing';

import { WebDataService } from './web-data.service';

describe('WebDataService', () => {
  let service: WebDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
