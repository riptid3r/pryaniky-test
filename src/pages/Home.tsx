import { Box, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CreateModal from '@/components/createModal/CreateModal'
import DataTable from '@/components/dataTable/DataTable'
import Header from '@/components/header/Header'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  addRecord,
  removeRecord,
  selectAppData,
  setAppData
} from '@/redux/slices/app.slice'
import { selectUserData } from '@/redux/slices/user.slice'

import { useAlert } from '@/hooks/useAlert'
import { useLoader } from '@/hooks/useLoader'

import { AlertMessages } from '@/types/alertMessages.dict'
import { ErrorCodes } from '@/types/errorCodes.dict'
import { BaseRecord } from '@/types/interfaces/records.interfaces'
import { RoutesConfig } from '@/types/routes.config'

import { DataService } from '@/services/data/data.service'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { data: user } = useAppSelector(selectUserData)
  const { selectedRow } = useAppSelector(selectAppData)

  const { loading, loader, toggleLoader } = useLoader()
  const { alert, setAlert } = useAlert()

  const [showModal, setShowModal] = useState<boolean>(false)

  const onCreateRecord = async (data: BaseRecord) => {
    toggleLoader(true)

    try {
      const {
        data: { data: result, error_code }
      } = await DataService.createRecord(data)

      if (!result || error_code == null || error_code !== ErrorCodes.Success) {
        showErrorMessage()
      } else {
        setAlert({
          children: AlertMessages.SuccessCreate,
          severity: 'success'
        })

        dispatch(addRecord(result))
        setShowModal(false)
      }
    } catch (e) {
      console.error('Create error', e)
      showErrorMessage()
    } finally {
      toggleLoader(false)
    }
  }

  const onDeleteRecord = async () => {
    if (!selectedRow) {
      setAlert({ children: AlertMessages.SelectRecord, severity: 'info' })
      return
    }

    toggleLoader(true)

    try {
      const {
        data: { error_code, data: result }
      } = await DataService.deleteRecord(selectedRow)

      if (error_code == null || error_code !== ErrorCodes.Success) {
        showErrorMessage()
        return
      }

      setAlert({
        children: `Поле (ID: ${selectedRow}) было успешно удалено`,
        severity: 'success'
      })

      dispatch(
        removeRecord({
          id: selectedRow
        })
      )

      dispatch(
        setAppData({
          selectedRow: null
        })
      )
    } catch (e) {
      console.error('Delete error', e)
      showErrorMessage()
    } finally {
      toggleLoader(false)
    }
  }

  const showErrorMessage = () => {
    setAlert({
      children: AlertMessages.UndefinedError,
      severity: 'error'
    })
  }

  const onSuccessEdit = () => {
    setAlert({
      children: `Поле (ID: ${selectedRow}) было успешно обновлено`,
      severity: 'success'
    })
  }

  useEffect(() => {
    if (!user?.token) {
      navigate(RoutesConfig.SignIn)
    }
  }, [user?.token])

  if (!user?.token) {
    return null
  }

  return (
    <Box
      sx={{
        minWidth: '100vh',
        minHeight: '100vh',
        py: 2,
        px: 2
      }}
    >
      {alert}
      {loader}
      <CreateModal
        open={showModal}
        loading={loading}
        onClose={() => setShowModal(false)}
        onCreate={onCreateRecord}
      />
      <Paper sx={{ minHeight: '96vh', maxWidth: 'inherit' }}>
        <Header
          loading={loading}
          onCreate={() => setShowModal(true)}
          onDelete={onDeleteRecord}
        />
        <DataTable
          toggleLoader={toggleLoader}
          onError={showErrorMessage}
          onSuccess={onSuccessEdit}
        />
      </Paper>
    </Box>
  )
}

export default Home
