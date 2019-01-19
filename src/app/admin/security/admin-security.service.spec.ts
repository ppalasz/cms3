import { TestBed } from '@angular/core/testing';

import { AdminSecurityService } from './admin-security.service';

describe('AdminSecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSecurityService = TestBed.get(AdminSecurityService);
    expect(service).toBeTruthy();
  });
});
