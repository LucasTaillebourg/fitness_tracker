import { RecoilRoot } from 'recoil'
import { AuthWrapper } from './features/login/AuthWrapper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import styles from './App.module.scss'
import { MantineProvider } from '@mantine/core'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Router } from './features/router/Router'

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <div className={styles.appContainer}>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <QueryClientProvider client={queryClient}>
        <MantineProvider defaultColorScheme='dark'>
          <RecoilRoot>
            <AuthWrapper>
              <Router />
            </AuthWrapper>
          </RecoilRoot>
        </MantineProvider>
      </QueryClientProvider>
    </div>
  )
}
