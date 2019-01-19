import { TestBed } from '@angular/core/testing';

import { ConfigReaderService } from './config-reader.service';

describe('ConfigReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigReaderService = TestBed.get(ConfigReaderService);
    expect(service).toBeTruthy();
  });
});
