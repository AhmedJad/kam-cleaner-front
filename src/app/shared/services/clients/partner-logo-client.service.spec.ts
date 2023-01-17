import { TestBed } from '@angular/core/testing';

import { PartnerLogoClientService } from './partner-logo-client.service';

describe('PartnerLogoClientService', () => {
  let service: PartnerLogoClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerLogoClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
