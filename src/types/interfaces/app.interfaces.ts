import { DataRecords } from './records.interfaces'

export interface IAppState {
  records: DataRecords
  selectedRow: string | null
}
