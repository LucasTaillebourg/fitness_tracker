import { RecoilRoot } from 'recoil'
import { AuthWrapper } from './features/login/AuthWrapper'
import { QueryClient, QueryClientProvider } from 'react-query'
import styles from './App.module.scss'
import { MantineProvider } from '@mantine/core'
import { LandingPage } from './features/landingPage/landingPage'

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <div className={styles.appContainer}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider defaultColorScheme='dark'>
          <RecoilRoot>
            <AuthWrapper>
              <LandingPage />
            </AuthWrapper>
          </RecoilRoot>
        </MantineProvider>
      </QueryClientProvider>
    </div>
  )
}
