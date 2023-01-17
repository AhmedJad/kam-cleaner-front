import { TestBed } from '@angular/core/testing';

import { FaqClientService } from './faq-client.service';

describe('FaqClientService', () => {
  let service: FaqClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
