import Auth from './Auth'
import PaymentController from './PaymentController'
import DashboardController from './DashboardController'
import PsychologistAppointmentController from './PsychologistAppointmentController'
import PsychologistScheduleController from './PsychologistScheduleController'
import TherapistController from './TherapistController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    PaymentController: Object.assign(PaymentController, PaymentController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    PsychologistAppointmentController: Object.assign(PsychologistAppointmentController, PsychologistAppointmentController),
    PsychologistScheduleController: Object.assign(PsychologistScheduleController, PsychologistScheduleController),
    TherapistController: Object.assign(TherapistController, TherapistController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers