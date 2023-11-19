import { useRecoilState } from 'recoil'
import { ConnectedUserAtom } from '../atoms/ConnectedUserAtom'

export const useToken = () => {
  const [connectedUser] = useRecoilState(ConnectedUserAtom)

  return { isAuthenticated: !!connectedUser?.token }
}
