import { TestBed } from '@angular/core/testing';

import { LeafDataService } from './leaf-data.service';

describe('LeafDataService', () => {
  let service: LeafDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
