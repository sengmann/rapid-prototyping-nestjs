import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Appointment, OpeningHoursPerBranch } from '@w11k/api-interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpeningHoursValidatorService } from '../opening-hours-validator.service';
import { timeRegExp } from '@w11k/shared';

@Component({
  selector: 'w11k-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss'],
})
export class AppointmentDetailComponent implements OnChanges {
  @Output() appointmentSaved = new EventEmitter<Partial<Appointment>>();
  @Input() appointment: Appointment;
  @Input() openingHoursPerBranch: OpeningHoursPerBranch;

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

  form = new FormGroup(this.formModel, {
    asyncValidators: [
      this.openingHoursValidatorService.openingHoursValidator('time', 'branch'),
    ],
  });

  constructor(
    private readonly openingHoursValidatorService: OpeningHoursValidatorService
  ) {}

  ngOnChanges(): void {
    if (this.appointment != null) {
      this.form.patchValue(this.appointment);
    }
  }

  save() {
    this.appointmentSaved.emit(this.form.value);
  }
}
