import styles from './InputBox.module.scss'
import { PropsWithChildren } from 'react'

/**
 * 入力フィールドのレイアウト
 */
export default function InputBox({ children }: PropsWithChildren) {
  return <div className={styles.layout}>{children}</div>
}
