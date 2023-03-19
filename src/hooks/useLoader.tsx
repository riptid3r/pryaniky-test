import { useState } from 'react'

import Loader from '@/components/loader/Loader'

export const useLoader = () => {
  const [loading, setLoading] = useState<boolean>(false)

  return {
    loading,
    loader: loading ? <Loader /> : null,
    toggleLoader: setLoading
  }
}
