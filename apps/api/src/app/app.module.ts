import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsController } from './appointments/appointments.controller';
import { AppointmentsService } from './appointments/appointments.service';
import { BranchesController } from './branches/branches.controller';

@Module({
  imports: [],
  controllers: [AppController, AppointmentsController, BranchesController],
  providers: [AppService, AppointmentsService],
})
export class AppModule {}
