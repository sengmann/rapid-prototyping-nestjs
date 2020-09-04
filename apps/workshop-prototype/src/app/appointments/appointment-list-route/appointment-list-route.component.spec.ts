import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentListRouteComponent } from './appointment-list-route.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppointmentListRouteComponent', () => {
  let component: AppointmentListRouteComponent;
  let fixture: ComponentFixture<AppointmentListRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentListRouteComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
