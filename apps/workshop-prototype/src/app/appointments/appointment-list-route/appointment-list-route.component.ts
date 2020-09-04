import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '@w11k/api-interfaces';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'w11k-appointment-list-route',
  templateUrl: './appointment-list-route.component.html',
  styleUrls: ['./appointment-list-route.component.css']
})
export class AppointmentListRouteComponent implements OnInit {

  appointments$: Observable<Appointment[]>;

  constructor(private readonly service: AppointmentsService) { }

  ngOnInit(): void {
    this.appointments$ = this.service.getAll();
  }

}
