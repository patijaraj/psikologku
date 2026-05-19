import users from './users'
import shield from './shield'

const resources = {
    users: Object.assign(users, users),
    shield: Object.assign(shield, shield),
}

export default resources