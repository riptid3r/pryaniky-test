import { yupResolver } from '@hookform/resolvers/yup'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  Typography
} from '@mui/material'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import LoginField from '@/components/loginField/LoginField'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectUserData, setUserData } from '@/redux/slices/user.slice'

import { useAlert } from '@/hooks/useAlert'
import { useLoader } from '@/hooks/useLoader'

import { ILoginUser } from '@/types/interfaces/user.interfaces'
import { RoutesConfig } from '@/types/routes.config'

import { loginSchema } from '@/utils/schemas/login.schema'

import { AuthService } from '@/services/auth/auth.service'

const SignIn: FC = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { data } = useAppSelector(selectUserData)

  const { alert, setAlert } = useAlert()
  const { loading, loader, toggleLoader } = useLoader()

  const [showPass, setShowPass] = useState<boolean>(false)

  const form = useForm<ILoginUser>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema)
  })

  const showError = (message?: string) => {
    setAlert({
      children:
        message ?? 'Произошла ошибка при авторизации. Повторите попытку',
      severity: 'error'
    })
  }

  const onSubmit = async (formData: ILoginUser) => {
    toggleLoader(true)

    try {
      const { data } = await AuthService.signIn(formData)

      if (data?.data?.token) {
        dispatch(
          setUserData({
            token: data.data.token,
            username: form.getValues().username
          })
        )

        navigate(RoutesConfig.Home)
      } else {
        showError(data.error_text)
      }
    } catch (e) {
      console.error('Login error', e)
      showError()
    } finally {
      toggleLoader(false)
    }
  }

  if (data?.token) {
    return null
  }

  return (
    <Container maxWidth='sm'>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        {loader}
        {alert}
        <Paper
          elevation={24}
          sx={{
            pt: 2,
            pb: 3,
            px: 3,
            width: 1,
            transform: 'translateY(-30%)'
          }}
        >
          <Box>
            <Typography variant='h6' component='h1'>
              Авторизация в приложение
            </Typography>

            <Box
              component='form'
              display='flex'
              flexDirection='column'
              mt={2}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormProvider {...form}>
                <LoginField
                  disabled={loading}
                  name='username'
                  label='Логин'
                  showText={true}
                  icon={<PersonIcon />}
                />
                <LoginField
                  disabled={loading}
                  name='password'
                  label='Пароль'
                  icon={<LockIcon />}
                  showText={showPass}
                  onToggleVisibility={() => setShowPass(!showPass)}
                />
                <Button
                  disabled={loading}
                  type='submit'
                  fullWidth
                  variant='contained'
                  disableElevation
                >
                  Войти
                </Button>
              </FormProvider>
            </Box>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              mt={2}
            >
              <Link href='#' underline='hover' color='#000'>
                Восстановить аккаунт
              </Link>
              <Link href='#' underline='hover'>
                Нет аккаунта? Зарегистрируйтесь
              </Link>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Container>
  )
}

export default SignIn
