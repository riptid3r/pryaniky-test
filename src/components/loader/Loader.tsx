import { CircularProgress, Grid, alpha } from '@mui/material'

const Loader = () => {
  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        minWidth: '100vw',
        minHeight: '100vh',
        background: alpha('#fff', 0.5),
        zIndex: 1000
      }}
    >
      <CircularProgress />
    </Grid>
  )
}

export default Loader
