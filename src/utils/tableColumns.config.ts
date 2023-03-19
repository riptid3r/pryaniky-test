import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 280,
    editable: false
  },
  {
    field: 'companySigDate',
    headerName: 'companySigDate',
    width: 200,
    editable: true,
    valueFormatter: (params) =>
      moment(params.value).format('DD.MM.YYYY, HH:mm:ss')
  },
  {
    field: 'companySignatureName',
    headerName: 'companySignatureName',
    width: 200,
    editable: true
  },
  {
    field: 'documentName',
    headerName: 'documentName',
    width: 200,
    editable: true
  },
  {
    field: 'documentStatus',
    headerName: 'documentStatus',
    width: 220,
    editable: true
  },
  {
    field: 'documentType',
    headerName: 'documentType',
    width: 220,
    editable: true
  },
  {
    field: 'employeeNumber',
    headerName: 'employeeNumber',
    width: 220,
    editable: true
  },
  {
    field: 'employeeSigDate',
    headerName: 'employeeSigDate',
    width: 220,
    editable: true,
    valueFormatter: (params) =>
      moment(params.value).format('DD.MM.YYYY, HH:mm:ss')
  },
  {
    field: 'employeeSignatureName',
    headerName: 'employeeSignatureName',
    width: 220,
    editable: true
  }
]
