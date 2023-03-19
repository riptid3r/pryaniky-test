import { IUserState } from '@/types/interfaces/user.interfaces'
import { LocalStorageKeys } from '@/types/localStorage.dict'

export const LocalStorageApi = {
  getToken: () => localStorage.getItem(LocalStorageKeys.Token),
  getUsername: () => localStorage.getItem(LocalStorageKeys.Username),
  setData: ({ token, username }: IUserState) => {
    localStorage.setItem(LocalStorageKeys.Token, token)
    localStorage.setItem(LocalStorageKeys.Username, username)
  },
  clearData: () => localStorage.clear()
}
