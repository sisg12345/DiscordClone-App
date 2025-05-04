import styles from './ErrorFallback.module.scss'

/**
 * エラーフォールバックページ
 */
export default function ErrorFallback() {
  return (
    <main className={styles.errorFallback} role="alert">
      <h1>エラーが発生しました (´･ω･`)</h1>
      <p>申し訳ありません。ページを表示中に問題が発生しました。</p>
    </main>
  )
}
