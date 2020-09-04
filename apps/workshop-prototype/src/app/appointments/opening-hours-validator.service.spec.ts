import { TestBed } from '@angular/core/testing';
import { OpeningHoursValidatorService } from './opening-hours-validator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OpeningHoursValidatorService', () => {
  let service: OpeningHoursValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OpeningHoursValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
