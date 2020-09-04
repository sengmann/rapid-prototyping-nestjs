import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentListRouteComponent } from './appointment-list-route.component';

describe('AppointmentListRouteComponent', () => {
  let component: AppointmentListRouteComponent;
  let fixture: ComponentFixture<AppointmentListRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentListRouteComponent ]
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
