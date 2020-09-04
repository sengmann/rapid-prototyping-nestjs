import { Injectable } from '@angular/core';
import { AppointmentsService } from './appointments.service';
import { AsyncValidatorFn, FormGroup } from '@angular/forms';
import { first, map } from 'rxjs/operators';

export const timeRegExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

@Injectable({
  providedIn: 'root',
})
export class OpeningHoursValidatorService {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  openingHoursValidator(
    timeControlName: string,
    branchIdControlName: string
  ): AsyncValidatorFn {
    return (group: FormGroup) => {
      const time = group.get(timeControlName)?.value;
      const branchId = group.get(branchIdControlName)?.value;
      return this.appointmentsService.getOpeningHoursPerBranch().pipe(
        first(),
        map((perBranch) => perBranch[branchId]),
        map((openingHoursOfBranch) => {
          if (time == null || openingHoursOfBranch == null) {
            return { openingHours: 'Could not find time or opening hours' };
          }

          return isTimeInInterval(
            time,
            openingHoursOfBranch.openingHoursStart,
            openingHoursOfBranch.openingHoursEnd
          )
            ? null
            : {
                openingHours: `time ${time} is not in interval [${openingHoursOfBranch.openingHoursStart}, ${openingHoursOfBranch.openingHoursEnd}]`,
              };
        })
      );
    };
  }
}

function isTimeInInterval(time: string, start: string, end: string): boolean {
  const allInCorrectFormat =
    timeRegExp.test(time) && timeRegExp.test(start) && timeRegExp.test(end);
  if (allInCorrectFormat === false) {
    return false;
  }

  return allInCorrectFormat && time >= start && time <= end;
}
