import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from '../../../../workshop-prototype/src/app/appointments/appointments.service';
import { APPOINTMENTS } from './appointments.mock';

describe('Appointments Controller', () => {
  let controller: AppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      imports: [],
      providers: [{
        provide: AppointmentsService,
        useValue: {
          getAll: jest.fn().mockReturnValue(APPOINTMENTS),
          updateAppointment: jest.fn().mockReturnValue({
            id: 1,
            assignment: '000-000-01',
            branch: 'Dortmund',
            status: 'Reparatur',
            date: '2020-09-02',
            time: "07:00",
            vehicleOwner: "Sascha",
            vehicleRegNo: "ES-WW-01"
          })
        }
      }],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllAppointments', () => {
    it('should return all appointments', () => {
      expect(controller.getAllAppointments()).toStrictEqual([
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
      ])
    });
  });

  describe('saveAppointment', () => {
    it('should return updated appointment', () => {
      const updatedAppointment = controller.saveAppointment('1', {
        assignment: '000-000-01',
        branch: 'Dortmund',
        status: 'Reparatur',
        date: '2020-09-02',
        time: "07:00",
        vehicleOwner: "Sascha",
        vehicleRegNo: "ES-WW-01"
      })
      expect(updatedAppointment).toStrictEqual({
        id: 1,
        assignment: '000-000-01',
        branch: 'Dortmund',
        status: 'Reparatur',
        date: '2020-09-02',
        time: "07:00",
        vehicleOwner: "Sascha",
        vehicleRegNo: "ES-WW-01"
      })
    });
  });
});
