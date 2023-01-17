import { TestBed } from '@angular/core/testing';

import { SliderClientService } from './slider-client.service';

describe('SliderClientService', () => {
  let service: SliderClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
