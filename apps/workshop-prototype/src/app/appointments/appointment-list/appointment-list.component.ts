import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '@w11k/api-interfaces';

@Component({
  selector: 'w11k-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  @Input() appointments: Appointment[]

  constructor() { }

  ngOnInit(): void {
  }

}
