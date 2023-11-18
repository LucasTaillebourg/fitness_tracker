import { useRecoilState } from 'recoil'
import { TokenAtom } from './TokenAtom'
import { UserIdAtom } from './UserIdAtom'

export const useLogin = () => {
  const [token, setToken] = useRecoilState(TokenAtom)
  const [userId, setUserId] = useRecoilState(UserIdAtom)

  return { isAuthenticated: !!token }
}
