import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
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

  @Patch(':id')
  saveAppointment(@Param('id') id: string, @Body() appointment: Partial<Appointment>): Appointment {
    console.log("id %o, appointment %o", id, appointment);
    return this.appointmentService.updateAppointment(parseInt(id, 10), appointment);
  }
}
