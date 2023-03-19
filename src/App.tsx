import { FC, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'

import Home from '@/pages/Home'
import SignIn from '@/pages/SignIn'

import Loader from '@/components/loader/Loader'

import { useAppDispatch } from '@/redux/hooks'
import { setUserData } from '@/redux/slices/user.slice'

import { RoutesConfig } from '@/types/routes.config'

import { LocalStorageApi } from './utils/localStorage.utils'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const token = LocalStorageApi.getToken()

    if (!token) {
      navigate(RoutesConfig.SignIn)
      return
    }

    const username = LocalStorageApi.getUsername()

    if (!username) {
      console.warn('Failed to fetch username')
    }

    dispatch(
      setUserData({
        token,
        username: username ?? 'Error'
      })
    )

    navigate(RoutesConfig.Home)
  }, [])

  return (
    <>
      <Routes>
        <Route
          path={RoutesConfig.Home}
          element={<Home />}
          loader={() => <Loader />}
        />
        <Route
          path={RoutesConfig.SignIn}
          element={<SignIn />}
          loader={() => <Loader />}
        />
      </Routes>
    </>
  )
}

export default App
