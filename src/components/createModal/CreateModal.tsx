import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material'
import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { BaseRecord } from '@/types/interfaces/records.interfaces'

import { createRecordSchema } from '@/utils/schemas/createRecord.schema'

const fields: (keyof BaseRecord)[] = [
  'companySigDate',
  'companySignatureName',
  'documentName',
  'documentStatus',
  'documentType',
  'employeeNumber',
  'employeeSigDate',
  'employeeSignatureName'
]

interface ICreateModalProps {
  open: boolean
  loading: boolean
  onClose: () => void
  onCreate: (data: BaseRecord) => void
}

const CreateModal: FC<ICreateModalProps> = ({
  open,
  loading,
  onClose,
  onCreate
}) => {
  const form = useForm<BaseRecord>({
    mode: 'onChange',
    resolver: yupResolver(createRecordSchema)
  })

  useEffect(() => {
    form.reset()
  }, [open])

  return (
    <Dialog open={open}>
      <Box component='form' onSubmit={form.handleSubmit(onCreate)}>
        <DialogTitle>Создание записи</DialogTitle>
        <DialogContent>
          <Grid container rowGap={2} sx={{ py: 2 }}>
            {fields.map((key) => (
              <Grid item xs={12} key={key}>
                <Controller
                  name={key}
                  control={form.control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label={key}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error?.message}
                      disabled={loading}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box display='flex' justifyContent='space-between' width={1} px={2}>
            <Button
              variant='text'
              type='button'
              sx={{ color: '#000' }}
              disableElevation
              onClick={onClose}
              disabled={loading}
            >
              Закрыть
            </Button>
            <Button
              variant='contained'
              type='submit'
              disableElevation
              disabled={loading}
            >
              Создать
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default CreateModal
