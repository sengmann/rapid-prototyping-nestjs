import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppointmentsModule } from './appointments/appointments.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppointmentsModule, RouterModule.forRoot([{ path: '**', redirectTo: '/appointment' } ])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
