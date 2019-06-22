import { TestBed } from '@angular/core/testing';

import { QueryserviceService } from './queryservice.service';

describe('QueryserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryserviceService = TestBed.get(QueryserviceService);
    expect(service).toBeTruthy();
  });
});
