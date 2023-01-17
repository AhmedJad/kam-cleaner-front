import { TestBed } from '@angular/core/testing';

import { AboutClientService } from './about-client.service';

describe('AboutClientService', () => {
  let service: AboutClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
