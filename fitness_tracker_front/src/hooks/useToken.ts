import { useRecoilState } from 'recoil'
import { ConnectedUserAtom } from '../atoms/TokenAtom'

export const useToken = () => {
  const [connectedUser] = useRecoilState(ConnectedUserAtom)

  return { isAuthenticated: !!connectedUser?.token }
}
