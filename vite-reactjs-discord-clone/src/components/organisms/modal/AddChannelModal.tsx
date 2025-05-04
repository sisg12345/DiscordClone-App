import styles from './AddChannelModal.module.scss'
import Button from '@/components/atoms/buttons/Button'
import { FormEvent, useEffect, useRef, useState } from 'react'

interface AddChannelModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (channelName: string) => Promise<void>
}

export default function AddChannelModal({ isOpen, onClose, onSubmit }: AddChannelModalProps) {
  // チャンネル名の状態を管理
  const [channelName, setChannelName] = useState<string>('')
  // 送信ボタンの状態を管理
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  // 入力フィールドの参照
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * メッセージ編集をキャンセル
   */
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      if (isOpen) {
        // モーダルを閉じる
        onClose()
      }
    }
  })

  /**
   * チャンネル名を送信
   *
   * @param e * フォームのイベント
   */
  const handleSubmit = (e: FormEvent) => {
    // フォームのデフォルトの送信を防ぐ
    e.preventDefault()
    // チャンネルを登録
    onSubmit(channelName)
    // モーダルを閉じる
    onClose()
  }

  useEffect(() => {
    // モーダルが開いたときに入力フィールドにフォーカスを当てる
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    // チャンネル名が空でない場合に送信ボタンを有効化
    if (channelName.trim().length > 0) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }, [channelName])

  // モーダルが開いていない場合は何も表示しない
  if (!isOpen) {
    return null
  }

  return (
    <div
      className={styles.modalOverlay}
      // 背景クリックでモーダルを閉じる
      onClick={onClose}
    >
      <div
        className={styles.modalContainer}
        // モーダル内のクリックイベントを伝播させない
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h1>チャンネルを作成</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <label htmlFor="channelId">チャンネル名</label>
            <div className={styles.channelNameInput}>
              <span>#</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="新チャンネル"
                maxLength={200}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <Button className={styles.cancelButton} variant="cancel" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit" variant="primary" disabled={!canSubmit}>
              チャンネルを作成
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
