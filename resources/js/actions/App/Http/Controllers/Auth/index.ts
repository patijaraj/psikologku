import SocialiteController from './SocialiteController'
import CompleteProfileController from './CompleteProfileController'
const Auth = {
    SocialiteController: Object.assign(SocialiteController, SocialiteController),
CompleteProfileController: Object.assign(CompleteProfileController, CompleteProfileController),
}

export default Auth