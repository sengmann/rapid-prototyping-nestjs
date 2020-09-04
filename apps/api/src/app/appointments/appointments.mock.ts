import { Appointment } from '@w11k/api-interfaces';

export const APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    assignment: '000-000-01',
    branch: 'Dortmund',
    status: 'Reparatur',
    date: '2020-09-02',
    time: "07:00",
    vehicleOwner: "Sascha",
    vehicleRegNo: "ES-WW-01"
  },
  {
    id: 2,
    assignment: '000-000-02',
    branch: 'Berlin',
    status: 'Abholung',
    date: '2020-09-03',
    time: "08:00",
    vehicleOwner: "Tobi",
    vehicleRegNo: "B-WW-33"
  }
];
