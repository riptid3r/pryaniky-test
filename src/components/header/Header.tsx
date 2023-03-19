import { Add, Delete } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/redux/hooks'
import { selectAppData, setAppData } from '@/redux/slices/app.slice'
import { selectUserData, setUserData } from '@/redux/slices/user.slice'

import { RoutesConfig } from '@/types/routes.config'

interface IHeaderProps {
  loading: boolean
  onCreate: () => void
  onDelete: () => void
}

const Header: FC<IHeaderProps> = ({ loading, onCreate, onDelete }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userData = useAppSelector(selectUserData)
  const { selectedRow } = useAppSelector(selectAppData)

  const onLogOut = () => {
    dispatch(setUserData(null))
    dispatch(
      setAppData({
        records: [],
        selectedRow: null
      })
    )

    navigate(RoutesConfig.SignIn)
  }

  return (
    <Box px={3} py={2}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        pb={2}
        borderBottom='1px solid #ccc'
      >
        <Box>
          <Typography variant='body1'>Здравствуйте,</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>
            {userData.data?.username}
          </Typography>
        </Box>

        <Button variant='contained' disableElevation onClick={onLogOut}>
          Выйти из аккаунта
        </Button>
      </Box>

      <Box mt={2} display='flex' justifyContent='space-between'>
        <Button
          sx={{ color: '#000', mr: 2 }}
          disabled={loading}
          onClick={onCreate}
          startIcon={<Add />}
        >
          Создать запись
        </Button>
        <Button
          sx={{ color: '#000' }}
          onClick={onDelete}
          disabled={loading || !selectedRow}
          startIcon={<Delete />}
        >
          Удалить запись (
          {selectedRow == null ? 'Не выбрано' : `ID: ${selectedRow}`})
        </Button>
      </Box>
    </Box>
  )
}

export default Header
