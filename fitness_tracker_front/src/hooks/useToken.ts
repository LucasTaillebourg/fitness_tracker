import { useRecoilState } from 'recoil'
import { TokenAtom } from '../atoms/TokenAtom'
import { UserIdAtom } from '../atoms/UserIdAtom'

export const useToken = () => {
  const [token, setToken] = useRecoilState(TokenAtom)
  const [userId, setUserId] = useRecoilState(UserIdAtom)

  return { isAuthenticated: !!token }
}
