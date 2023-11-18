import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot } from 'recoil'
import { AuthWrapper } from './features/login/AuthWrapper'
import { QueryClient, QueryClientProvider } from 'react-query'

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AuthWrapper>
          <div>
            <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
              <img src={viteLogo} className='logo' alt='Vite logo' />
            </a>
            <a href='https://react.dev' target='_blank' rel='noreferrer'>
              <img src={reactLogo} className='logo react' alt='React logo' />
            </a>
          </div>
        </AuthWrapper>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
