import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentDetailRouteComponent } from './appointment-detail-route.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppointmentDetailRouteComponent', () => {
  let component: AppointmentDetailRouteComponent;
  let fixture: ComponentFixture<AppointmentDetailRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentDetailRouteComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
