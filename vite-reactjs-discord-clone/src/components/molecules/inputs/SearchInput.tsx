import styles from './SearchInput.module.scss'
import { InputHTMLAttributes } from 'react'
import { SearchIcon } from '@/components/atoms/icons/Icons'

/**
 * 検索アイコン付き入力
 */
export default function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.searchInput}>
      <input type="text" placeholder="検索" {...props} />
      <SearchIcon />
    </div>
  )
}
