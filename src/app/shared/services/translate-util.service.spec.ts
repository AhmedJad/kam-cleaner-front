import { TestBed } from '@angular/core/testing';

import { TranslateUtilService } from './translate-util.service';

describe('TranslateUtilService', () => {
  let service: TranslateUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
