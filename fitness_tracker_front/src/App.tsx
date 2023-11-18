import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { RecoilRoot } from 'recoil'
import { AuthWrapper } from './features/login/AuthWrapper'
import { QueryClient, QueryClientProvider } from 'react-query'
import styles from './App.module.scss'
import { MantineProvider } from '@mantine/core'

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <div className={styles.appContainer}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider defaultColorScheme='dark'>
          <RecoilRoot>
            <AuthWrapper>
              <div>
                <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
                  <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank' rel='noreferrer'>
                  <img
                    src={reactLogo}
                    className='logo react'
                    alt='React logo'
                  />
                </a>
              </div>
            </AuthWrapper>
          </RecoilRoot>
        </MantineProvider>
      </QueryClientProvider>
    </div>
  )
}
