import styles from './Button.module.scss'
import { Button as MaterialButton, ButtonProps as MaterialButtonProps } from '@mui/material'
import { PropsWithChildren } from 'react'

interface ButtonProps extends Omit<MaterialButtonProps, 'variant'> {
  variant?: 'primary' | 'cancel' | 'danger'
}

/**
 * ボタン
 */
export default function Button({
  variant = 'primary',
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  // variantの値に応じてクタすを変更
  let buttonStyle = ''

  switch (variant) {
    case 'cancel':
      buttonStyle = styles.cancel
      break
    case 'danger':
      buttonStyle = styles.danger
      break
    default:
      // primary
      buttonStyle = styles.primary
  }

  props.className = `${props.className || ''} ${styles.button} ${buttonStyle}`

  return <MaterialButton {...props}>{children}</MaterialButton>
}
