import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { FC, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { ILoginUser } from '@/types/interfaces/user.interfaces'

interface ILoginFieldProps {
  name: keyof ILoginUser
  label: string
  icon: ReactNode
  disabled: boolean
  showText?: boolean
  onToggleVisibility?: () => void
}

const LoginField: FC<ILoginFieldProps> = ({
  name,
  label,
  icon,
  showText,
  disabled,
  onToggleVisibility
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          onChange={onChange}
          value={value}
          type={showText ? 'text' : 'password'}
          disabled={disabled}
          error={!!error}
          helperText={error?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>{icon}</InputAdornment>
            ),
            endAdornment: onToggleVisibility && (
              <InputAdornment position='end'>
                <IconButton edge='end' onClick={onToggleVisibility}>
                  {!showText ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ mb: 2 }}
        />
      )}
    />
  )
}

export default LoginField
