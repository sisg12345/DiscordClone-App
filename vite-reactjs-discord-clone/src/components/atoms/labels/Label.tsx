import styles from './Label.module.scss'
import { PropsWithChildren } from 'react'

interface LabelProps {
  id: string
}

/**
 * ラベル
 */
export default function Label({ id, children }: PropsWithChildren<LabelProps>) {
  return (
    <label htmlFor={id} className={styles.label}>
      {children}
    </label>
  )
}
