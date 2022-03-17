import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

interface Props {
  currentValue: number,
  maxValue: number,

  updateQuantity: (newValue: number) => void

}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updateQuantity }) => {

  const addOrRemeve = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return
      return updateQuantity(currentValue - 1)
    }

    if (currentValue >= maxValue) return;
    updateQuantity(currentValue + 1)

  }

  return (
    <Box display={'flex'} alignItems='center'>
      <IconButton onClick={() => addOrRemeve(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }} >{currentValue}</Typography>
      <IconButton onClick={() => addOrRemeve(+ 1)}>
        <AddCircleOutline />
      </IconButton>
    </Box >
  )
}
