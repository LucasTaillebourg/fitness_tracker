import { useMutation } from 'react-query'
import { axiosFetcher } from 'src/utils/axiosFetcher'

export const useRegister = () => {
  return useMutation((payload) =>
    axiosFetcher({
      method: 'POST',
      url: `billing_invoices/export`,
      data: payload,
    })
  )
}
