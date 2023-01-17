import { TestBed } from '@angular/core/testing';

import { CounterClientService } from './counter-client.service';

describe('CounterClientService', () => {
  let service: CounterClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
