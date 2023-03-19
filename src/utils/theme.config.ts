import { alpha, createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#eb9534'
    },
    secondary: {
      main: '#14213d'
    },
    background: {
      default: '#8d99ae',
      paper: '#edf2f4'
    }
  },
  typography: {
    fontFamily: [
      '--apple-system',
      'BlinkMacSystemFont',
      'Inter',
      'Roboto',
      'sans-serif'
    ].join(','),
    fontSize: 13,
    htmlFontSize: 17
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 50,
          textTransform: 'none',
          color: '#fff',
          fontSize: 13
        })
      }
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: alpha(theme.palette.secondary.main, 0.5)
        })
      }
    }
  }
})
