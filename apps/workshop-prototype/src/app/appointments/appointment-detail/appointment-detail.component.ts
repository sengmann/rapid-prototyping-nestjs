import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Appointment } from '@w11k/api-interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const timeRegExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

@Component({
  selector: 'w11k-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss'],
})
export class AppointmentDetailComponent implements OnChanges {
  @Output() appointmentSaved = new EventEmitter<Partial<Appointment>>();
  @Input() appointment;
  formModel: { [key in keyof Appointment]?: FormControl } = {
    vehicleOwner: new FormControl(null, Validators.required),
    vehicleRegNo: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    time: new FormControl(null, [
      Validators.required,
      Validators.pattern(timeRegExp),
    ]),
    status: new FormControl(null),
    branch: new FormControl(null, Validators.required),
    assignment: new FormControl(null),
  };
  form = new FormGroup(this.formModel);

  constructor() {}

  ngOnChanges(): void {
    if (this.appointment != null) {
      this.form.patchValue(this.appointment);
    }
  }

  save() {
    this.appointmentSaved.emit(this.form.value);
  }
}
