import { TestBed } from '@angular/core/testing';

import { GalleryClientService } from './gallery-client.service';

describe('GalleryClientService', () => {
  let service: GalleryClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
