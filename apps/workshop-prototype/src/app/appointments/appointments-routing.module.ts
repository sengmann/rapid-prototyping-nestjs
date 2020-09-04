import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListRouteComponent } from './appointment-list-route/appointment-list-route.component';

const routes: Routes = [
  { path: 'appointment', component: AppointmentListRouteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {
}
