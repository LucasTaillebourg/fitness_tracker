import { atom } from 'recoil'
export interface ConnectedUser {
  username: string
  token: string
}

export const ConnectedUserAtom = atom<ConnectedUser>({
  key: 'token',
  default: undefined,
})
