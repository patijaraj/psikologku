import Auth from './Auth'
import PaymentController from './PaymentController'
import TherapistController from './TherapistController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    PaymentController: Object.assign(PaymentController, PaymentController),
    TherapistController: Object.assign(TherapistController, TherapistController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers