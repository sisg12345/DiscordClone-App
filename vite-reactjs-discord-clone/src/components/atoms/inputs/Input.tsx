import styles from './Input.module.scss'

import { InputHTMLAttributes } from 'react'

/**
 * 入力フィールド
 */
export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles.input} {...props} />
}
