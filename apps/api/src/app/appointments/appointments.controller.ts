import { Controller, Get } from '@nestjs/common';
import { Appointment } from '@w11k/api-interfaces';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {

  constructor(private readonly appointmentService: AppointmentsService) {

  }

  @Get()
  getAllAppointments(): Appointment[] {
    return this.appointmentService.getAll();
  }
}
