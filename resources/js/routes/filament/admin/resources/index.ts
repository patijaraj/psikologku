import psychologistProfiles from './psychologist-profiles'
import reports from './reports'
import transactions from './transactions'
import users from './users'
import shield from './shield'

const resources = {
    psychologistProfiles: Object.assign(psychologistProfiles, psychologistProfiles),
    reports: Object.assign(reports, reports),
    transactions: Object.assign(transactions, transactions),
    users: Object.assign(users, users),
    shield: Object.assign(shield, shield),
}

export default resources