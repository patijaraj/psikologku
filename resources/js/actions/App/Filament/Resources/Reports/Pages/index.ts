import ListReports from './ListReports'
import CreateReport from './CreateReport'
import EditReport from './EditReport'

const Pages = {
    ListReports: Object.assign(ListReports, ListReports),
    CreateReport: Object.assign(CreateReport, CreateReport),
    EditReport: Object.assign(EditReport, EditReport),
}

export default Pages