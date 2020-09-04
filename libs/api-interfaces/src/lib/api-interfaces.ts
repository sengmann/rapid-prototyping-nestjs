export interface Message {
  message: string;
}

export interface Appointment {
  id?: number;
  assignment: string;
  branch: string;
  vehicleOwner: string;
  vehicleRegNo: string;
  status: string;
  date: string;
  time: string;
}
