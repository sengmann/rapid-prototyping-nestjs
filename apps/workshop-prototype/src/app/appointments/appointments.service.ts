import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Appointment, OpeningHoursPerBranch } from '@w11k/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  hasLoaded = false;
  subject = new BehaviorSubject<Appointment[]>([]);

  openingHoursPerBranchSubject = new BehaviorSubject<OpeningHoursPerBranch>(null);

  constructor(private readonly http: HttpClient) {
    this.http
      .get<OpeningHoursPerBranch>('api/branches')
      .subscribe((result) => this.openingHoursPerBranchSubject.next(result));
  }

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
      map((appointments) => appointments.find((a) => a.id === id))
    );
  }

  saveAppointment(
    id: number,
    appointment: Partial<Appointment>
  ): Observable<Appointment> {
    return this.http
      .patch<Appointment>('api/appointments/' + id, appointment)
      .pipe(
        catchError(err => throwError(err.error.message)),
        tap((result) => {
          this.subject.next(
            this.subject.value.map((a) => (a.id === id ? result : a))
          )
        }),
        switchMap( () => this.getById(id).pipe(take(1)))
      );
  }

  getOpeningHoursPerBranch(): Observable<OpeningHoursPerBranch> {
    return this.openingHoursPerBranchSubject.asObservable();
  }
}
