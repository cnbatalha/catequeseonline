import { TestBed } from '@angular/core/testing';

import { DizimoServiceService } from './dizimo-service.service';

describe('DizimoServiceService', () => {
  let service: DizimoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DizimoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
