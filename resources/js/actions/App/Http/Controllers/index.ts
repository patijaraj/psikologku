import Auth from './Auth'
import PaymentController from './PaymentController'
import UserProfileController from './UserProfileController'
import DashboardController from './DashboardController'
import PsychologistAppointmentController from './PsychologistAppointmentController'
import PsychologistRecordController from './PsychologistRecordController'
import ReferralLetterController from './ReferralLetterController'
import PsychologistScheduleController from './PsychologistScheduleController'
import TherapistController from './TherapistController'
import SessionController from './SessionController'
import NotificationController from './NotificationController'
import UserRecordController from './UserRecordController'
import ReportController from './ReportController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    PaymentController: Object.assign(PaymentController, PaymentController),
    UserProfileController: Object.assign(UserProfileController, UserProfileController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    PsychologistAppointmentController: Object.assign(PsychologistAppointmentController, PsychologistAppointmentController),
    PsychologistRecordController: Object.assign(PsychologistRecordController, PsychologistRecordController),
    ReferralLetterController: Object.assign(ReferralLetterController, ReferralLetterController),
    PsychologistScheduleController: Object.assign(PsychologistScheduleController, PsychologistScheduleController),
    TherapistController: Object.assign(TherapistController, TherapistController),
    SessionController: Object.assign(SessionController, SessionController),
    NotificationController: Object.assign(NotificationController, NotificationController),
    UserRecordController: Object.assign(UserRecordController, UserRecordController),
    ReportController: Object.assign(ReportController, ReportController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers