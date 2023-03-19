import { ResponseLogin } from '@/types/interfaces/responses.interfaces'
import { ILoginUser } from '@/types/interfaces/user.interfaces'

import { instance } from '@/services/api/instance.api'

export const AuthService = {
  async signIn(data: ILoginUser) {
    const response = await instance.post<ILoginUser, { data: ResponseLogin }>(
      '/ru/data/v3/testmethods/docs/login',
      data
    )

    return response
  }
}
