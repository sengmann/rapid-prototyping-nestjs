import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '@w11k/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  hasLoaded = false;
  subject = new BehaviorSubject<Appointment[]>([]);

  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Appointment[]> {
    if (this.hasLoaded === false) {
      this.http.get<Appointment[]>('api/appointments').subscribe(result => {
        this.hasLoaded = true;
        this.subject.next(result)
      });
    }
    return this.subject.asObservable();
  }

  getById(id: number): Observable<Appointment> {
    return this.getAll().pipe(
      map(appointments => appointments.find(a => a.id === id)),
      tap(a => {
        if (a === undefined) throw new Error(`Could not find appointment with id ${id}`)
      })
    )
  }

  saveAppointment(id: number, appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.patch<Appointment>('api/appointments/' + id, appointment)
      .pipe(
        tap(result => this.subject.next(this.subject.value.map(a => a.id === id ? result : a))),
        switchMap(() => this.getById(id).pipe(take(1)))
      );
  }
}
