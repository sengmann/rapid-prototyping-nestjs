import { Component, OnInit } from '@angular/core';
import { AppointmentsService, OpeningHoursPerBranch } from '../appointments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Appointment } from '@w11k/api-interfaces';

@Component({
  selector: 'w11k-appointment-detail-route',
  templateUrl: './appointment-detail-route.component.html',
  styleUrls: ['./appointment-detail-route.component.css'],
})
export class AppointmentDetailRouteComponent implements OnInit {
  appointment$: Observable<Appointment>;
  actualId: number;
  openingHoursPerBranch$: Observable<OpeningHoursPerBranch>;

  constructor(
    private readonly service: AppointmentsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.appointment$ = this.route.paramMap.pipe(
      map((params) => +params.get('id')),
      tap((id) => (this.actualId = id)),
      switchMap((id) => this.service.getById(id))
    );
    this.openingHoursPerBranch$ = this.service.getOpeningHoursPerBranch();
  }

  saveAppointment($event: Partial<Appointment>) {
    console.log('saving appointment', $event);
    this.service
      .saveAppointment(this.actualId, $event)
      .subscribe((_) => this.router.navigate(['..']));
  }
}
