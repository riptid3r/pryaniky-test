import { Alert, AlertProps, Snackbar } from '@mui/material'
import { useState } from 'react'

export const useAlert = () => {
  const [alert, setAlert] = useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null)

  return {
    alert: alert ? (
      <Snackbar open onClose={() => setAlert(null)} autoHideDuration={5000}>
        <Alert {...alert} onClose={() => setAlert(null)} />
      </Snackbar>
    ) : null,
    setAlert
  }
}
