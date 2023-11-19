import { atom } from 'recoil'
export interface ConnectedUser {
  username: string
  token: string
}

export const ConnectedUserAtom = atom<ConnectedUser | undefined>({
  key: 'token',
  default: undefined,
})
