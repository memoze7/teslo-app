import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const FullScreeLoading = () => {
  return (

    <Box display='flex'
      justifyContent='center'
      alignItems='center'
      height='calc(100vh - 200px)'
      sx={{ flexDirection: { xs: 'column', sm: 'column' } }}      >

      <CircularProgress thickness={2} />

    </Box>


  )
}

export default FullScreeLoading