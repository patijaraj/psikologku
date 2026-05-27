import ListTransactions from './ListTransactions'
import CreateTransaction from './CreateTransaction'
import EditTransaction from './EditTransaction'

const Pages = {
    ListTransactions: Object.assign(ListTransactions, ListTransactions),
    CreateTransaction: Object.assign(CreateTransaction, CreateTransaction),
    EditTransaction: Object.assign(EditTransaction, EditTransaction),
}

export default Pages