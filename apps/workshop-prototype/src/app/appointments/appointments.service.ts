import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '@w11k/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, take, tap } from 'rxjs/operators';

export interface OpeningHours {
  openingHoursStart: string;
  openingHoursEnd: string;
}

export interface OpeningHoursPerBranch {
  [key: string]: OpeningHours;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {

  hasLoaded = false;
  subject = new BehaviorSubject<Appointment[]>([]);

  openingHoursPerBranchSubject = new BehaviorSubject<OpeningHoursPerBranch>({
    Berlin: {
      openingHoursStart: '08:00',
      openingHoursEnd: '16:00',
    },
    Dortmund: {
      openingHoursStart: '07:00',
      openingHoursEnd: '20:00',
    },
  });

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Appointment[]> {
    if (this.hasLoaded === false) {
      this.http.get<Appointment[]>('api/appointments').subscribe((result) => {
        this.hasLoaded = true;
        this.subject.next(result);
      });
    }
    return this.subject.asObservable();
  }

  getById(id: number): Observable<Appointment> {
    return this.getAll().pipe(
      map((appointments) => appointments.find((a) => a.id === id)),
    );
  }

  saveAppointment(id: number, appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.patch<Appointment>('api/appointments/' + id, appointment)
      .pipe(
        tap(result => this.subject.next(this.subject.value.map(a => a.id === id ? result : a))),
        switchMap(() => this.getById(id).pipe(take(1)))
      );
  }

  getOpeningHoursPerBranch(): Observable<OpeningHoursPerBranch> {
    return this.openingHoursPerBranchSubject.asObservable();
  }
}
