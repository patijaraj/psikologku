import roles from './roles'
import users from './users'

const resources = {
    roles: Object.assign(roles, roles),
    users: Object.assign(users, users),
}

export default resources