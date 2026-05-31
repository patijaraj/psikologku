import ListReports from './ListReports'
import CreateReport from './CreateReport'
import ViewReport from './ViewReport'

const Pages = {
    ListReports: Object.assign(ListReports, ListReports),
    CreateReport: Object.assign(CreateReport, CreateReport),
    ViewReport: Object.assign(ViewReport, ViewReport),
}

export default Pages