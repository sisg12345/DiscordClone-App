import styles from './TextArea.module.scss'
import { TextareaHTMLAttributes } from 'react'

/**
 * テキストエリア
 */
export default function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={styles.textArea} {...props}></textarea>
}
