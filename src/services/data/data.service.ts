import { BaseRecord, IDataRecord } from '@/types/interfaces/records.interfaces'
import {
  ResponseGetRecords,
  ResponseRecord
} from '@/types/interfaces/responses.interfaces'

import { instance } from '@/services/api/instance.api'

export const DataService = {
  async getData() {
    const response = await instance<ResponseGetRecords>({
      url: '/ru/data/v3/testmethods/docs/userdocs/get',
      method: 'GET'
    })

    return response
  },

  async createRecord(data: BaseRecord) {
    const response = await instance<ResponseRecord>({
      url: `/ru/data/v3/testmethods/docs/userdocs/create`,
      method: 'POST',
      data
    })

    return response
  },

  async updateRecord({ id, ...data }: IDataRecord) {
    const response = await instance<ResponseRecord>({
      url: `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
      method: 'POST',
      data
    })

    return response
  },

  async deleteRecord(id: string) {
    const response = await instance<ResponseRecord>({
      url: `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
      method: 'POST'
    })

    return response
  }
}
