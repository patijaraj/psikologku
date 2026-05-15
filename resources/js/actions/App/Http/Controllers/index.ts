import Auth from './Auth'
import PaymentController from './PaymentController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    PaymentController: Object.assign(PaymentController, PaymentController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers