export interface IDataRecord {
  id: string
  companySigDate: string
  companySignatureName: string
  documentName: string
  documentStatus: string
  documentType: string
  employeeNumber: string
  employeeSigDate: string
  employeeSignatureName: string
}

export type DataRecords = IDataRecord[]

export type BaseRecord = Omit<IDataRecord, 'id'>
