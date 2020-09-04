import { Injectable } from '@nestjs/common';
import { Appointment } from '@w11k/api-interfaces';
import { APPOINTMENTS } from './appointments.mock';

@Injectable()
export class AppointmentsService {
  private appointments: Appointment[] = APPOINTMENTS;

  getAll(): Appointment[] {
    return this.appointments;
  }

  updateAppointment(id: number, appointment: Partial<Appointment>) {
    const canidate: Appointment | undefined = this.appointments.find(a => a.id === id)
    if (canidate === undefined) {
      throw new Error(`no appointment with id ${id} found.`);
    }
    const patchedAppointment: Appointment = { ...canidate, ...appointment };
    this.appointments = this.appointments.map(a => a.id === id ? patchedAppointment : a);
    return patchedAppointment;
  }
}
