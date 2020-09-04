import { TestBed } from '@angular/core/testing';

import { OpeningHoursValidatorService } from './opening-hours-validator.service';

describe('OpeningHoursValidatorService', () => {
  let service: OpeningHoursValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningHoursValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
