import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentListRouteComponent } from './appointment-list-route/appointment-list-route.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppointmentListRouteComponent, AppointmentListComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    HttpClientModule
  ]
})
export class AppointmentsModule {
}
