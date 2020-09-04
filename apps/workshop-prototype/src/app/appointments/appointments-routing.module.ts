import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListRouteComponent } from './appointment-list-route/appointment-list-route.component';
import { AppointmentDetailRouteComponent } from './appointment-detail-route/appointment-detail-route.component';

const routes: Routes = [
  {
    path: 'appointment', children: [
      { path: '', component: AppointmentListRouteComponent },
      { path: ':id', component: AppointmentDetailRouteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {
}
