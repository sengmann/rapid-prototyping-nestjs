import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailComponent } from './appointment-detail.component';
import { OpeningHoursValidatorService } from '../opening-hours-validator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppointmentDetailComponent', () => {
  let component: AppointmentDetailComponent;
  let fixture: ComponentFixture<AppointmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OpeningHoursValidatorService],
      declarations: [AppointmentDetailComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
