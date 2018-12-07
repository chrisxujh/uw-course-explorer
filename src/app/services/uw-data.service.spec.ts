import { TestBed } from '@angular/core/testing';

import { UwDataService } from './uw-data.service';

describe('UwDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UwDataService = TestBed.get(UwDataService);
    expect(service).toBeTruthy();
  });
});
