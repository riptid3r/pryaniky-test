import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'
import { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  selectAppData,
  setAppData,
  updateRecord
} from '@/redux/slices/app.slice'
import { selectUserData } from '@/redux/slices/user.slice'

import { ErrorCodes } from '@/types/errorCodes.dict'
import { IDataRecord } from '@/types/interfaces/records.interfaces'

import { columns } from '@/utils/tableColumns.config'

import { DataService } from '@/services/data/data.service'

interface IDataTableProps {
  onError: () => void
  onSuccess: () => void
  toggleLoader: (show: boolean) => void
}

const DataTable: FC<IDataTableProps> = ({
  onSuccess,
  onError,
  toggleLoader
}) => {
  const dispatch = useAppDispatch()

  const { data: user } = useAppSelector(selectUserData)
  const { records } = useAppSelector(selectAppData)

  const onSelect = (selected: GridRowSelectionModel) => {
    dispatch(setAppData({ selectedRow: (selected[0] as string) ?? null }))
  }

  const onEdit = async (newRow: IDataRecord, oldRow: IDataRecord) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow

    toggleLoader(true)

    try {
      const {
        data: { error_code, data: result }
      } = await DataService.updateRecord(newRow)

      if (!result || error_code !== ErrorCodes.Success) {
        onError()
      } else {
        dispatch(
          updateRecord({
            id: oldRow.id,
            data: result
          })
        )

        onSuccess()

        oldRow = { ...oldRow, ...result }
      }
    } catch (e) {
      console.error('Update error', e)
      onError()
    } finally {
      toggleLoader(false)
    }

    return oldRow
  }

  const fetchData = () => {
    if (!user?.token) {
      return
    }

    toggleLoader(true)

    DataService.getData()
      .then(({ data: { data: result, error_code } }) => {
        if (!result) {
          onError()
        } else {
          dispatch(
            setAppData({
              records: result
            })
          )
        }
      })
      .catch((e) => {
        onError()
        console.error(e)
      })
      .finally(() => {
        toggleLoader(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [user?.token])

  if (!user?.token) return null

  return (
    <DataGrid
      columns={columns}
      rows={records}
      autoHeight={true}
      processRowUpdate={onEdit}
      onRowSelectionModelChange={onSelect}
    />
  )
}

export default DataTable
