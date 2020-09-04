import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentListComponent } from './appointment-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppointmentListComponent', () => {
  let component: AppointmentListComponent;
  let fixture: ComponentFixture<AppointmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentListComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
