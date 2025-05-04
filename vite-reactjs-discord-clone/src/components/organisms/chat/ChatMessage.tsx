import styles from './Chat.module.scss'
import { DeleteIcon, EditIcon } from '@/components/atoms/icons/Icons'
import type { User } from '@/types/data'
import { Timestamp } from 'firebase/firestore'
import { useAppSelector } from '@/hooks/useRedux'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'

interface ChatMessageProps {
  id: string
  user: User
  message: string
  isEdited: boolean
  updatedAt: Timestamp
  onEditMessage: (channelId: string, messageId: string, message: string) => Promise<void>
  onDeleteMessage: (channelId: string, messageId: string) => Promise<void>
}

/**
 * チャットメッセージ
 */
export default function ChatMessage({
  id,
  user,
  message,
  isEdited,
  updatedAt,
  onEditMessage,
  onDeleteMessage,
}: ChatMessageProps) {
  // 編集状態の管理
  const [isEdit, setIsEdit] = useState<boolean>(false)
  // チャンネルIDの取得
  const channelId = useAppSelector((state) => state.channel.id)
  // 入力フィールドの参照
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * メッセージ編集をキャンセル
   */
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isEdit) {
      // 編集状態を解除
      setIsEdit(false)
    }
  })

  /**
   * メッセージ編集を登録
   *
   * @param e キーダウンイベント
   */
  const handleEditMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enterキーでメッセージを送信
    if (channelId && e.key === 'Enter') {
      if (e.currentTarget.value.trim() === '') {
        // メッセージを削除
        onDeleteMessage(channelId, id)
      } else {
        // メッセージを送信
        onEditMessage(channelId, id, e.currentTarget.value)
      }
      // 編集状態を解除
      setIsEdit(false)
    }
  }

  /**
   * 保存をクリックしたときに編集メッセージを登録
   */
  const handleClickSave = () => {
    if (channelId) {
      if (inputRef.current?.value.trim() === '') {
        // メッセージを削除
        onDeleteMessage(channelId, id)
      } else if (inputRef.current?.value) {
        // メッセージを送信
        onEditMessage(channelId, id, inputRef.current?.value)
      }
      // 編集状態を解除
      setIsEdit(false)
    }
  }

  useEffect(() => {
    // 編集状態のときに入力フィールドにフォーカスを当てる
    if (isEdit && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEdit])

  return (
    <div className={styles.message}>
      <img src={user?.photoURL} alt={user.displayName} />
      <div className={styles.messageInfo}>
        <span className={styles.chatUserAccount}>{user.displayName}</span>
        <span className={styles.messageTimestamp}>
          {new Date(updatedAt?.toDate()).toLocaleString()}
        </span>
        {isEdit ? (
          <div className={styles.messageEdit}>
            <input
              ref={inputRef}
              type="text"
              defaultValue={message}
              onKeyDown={(e) => handleEditMessage(e)}
            />
            <span>
              Escキーで<a onClick={() => setIsEdit(false)}>キャンセル</a> • Enterキーで
              <a onClick={() => handleClickSave()}>保存</a>
            </span>
          </div>
        ) : (
          <p>
            {message}
            {isEdited && <span>(編集済み)</span>}
          </p>
        )}
      </div>
      <div className={styles.messageEditIcons}>
        <EditIcon variant="lightgray" onClick={() => setIsEdit(true)} />
        <DeleteIcon variant="danger" onClick={() => channelId && onDeleteMessage(channelId, id)} />
      </div>
    </div>
  )
}
