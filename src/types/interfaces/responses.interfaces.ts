import { DataRecords, IDataRecord } from './records.interfaces'

export interface IBaseResponse {
  error_code: number
  error_text?: string
  error_message?: string
}

export type ResponseLogin = {
  data?: {
    token: string
  }
} & IBaseResponse

export type ResponseRecord = {
  data?: IDataRecord
} & IBaseResponse

export type ResponseGetRecords = {
  data?: DataRecords
} & IBaseResponse
