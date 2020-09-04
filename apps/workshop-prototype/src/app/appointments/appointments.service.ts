import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '@w11k/api-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>('api/appointments');
  }
}
