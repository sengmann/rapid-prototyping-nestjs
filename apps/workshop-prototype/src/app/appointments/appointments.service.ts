import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Appointment } from '@w11k/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  hasLoaded = false;
  subject = new ReplaySubject<Appointment[]>(1);

  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Appointment[]> {
    if (this.hasLoaded === false) {
      this.http.get<Appointment[]>('api/appointments').subscribe(result => this.subject.next(result));
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
}
