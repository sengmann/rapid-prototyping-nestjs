import { TestBed } from '@angular/core/testing';
import { AppointmentsService } from './appointments.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APPOINTMENTS } from '../../../../api/src/app/appointments/appointments.mock';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ /* Nur für UI Komponenten */],
      imports: [HttpClientTestingModule],
      providers: [],
      schemas: [ /* Nur für UI Komponenten */],
    });
    service = TestBed.inject(AppointmentsService);
    http = TestBed.inject(HttpTestingController);
    http.expectOne('api/branches');
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should load and return appointments', () => {
      service.hasLoaded = false;
      service.getAll().subscribe(ts => {
        expect(ts.length).toBe(2);
        expect(ts[0].branch).toBe('Dortmund')
      });

      const req = http.expectOne('api/appointments');
      expect(req.request.method).toEqual('GET');

      req.flush(APPOINTMENTS)
    });
  });
});
