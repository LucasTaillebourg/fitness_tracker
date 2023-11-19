import { AtomEffect, atom } from 'recoil'
export interface ConnectedUser {
  username: string
  token: string
}

export const localStorageEffect: <T>(
  key: string,
  defaultFunc?: () => T
) => AtomEffect<T> =
  (key, defaultFunc) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)

    if (savedValue === null) {
      if (defaultFunc) {
        const def = defaultFunc?.()
        setSelf(def)
        localStorage.setItem(key, JSON.stringify(def))
      }
    } else {
      setSelf(JSON.parse(savedValue ?? {}))
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue ?? {}))
    })
  }

export const ConnectedUserAtom = atom<ConnectedUser | undefined>({
  key: 'token',
  default: undefined,
  effects: [localStorageEffect('token')],
})
