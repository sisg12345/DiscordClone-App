import styles from './Chat.module.scss'
import {
  AddCircleOutLineIcon,
  CardGiftcardIcon,
  EmojiEmotionsIcon,
  GifIcon,
} from '@/components/atoms/icons/Icons'
import { FormEvent, useImperativeHandle, useRef, useState } from 'react'
import { useAppSelector } from '@/hooks/useRedux'
import { forwardRef } from 'react'
import type { User } from '@/types/data'

export interface ChatInputRef {
  focus: () => void
}

interface ChatInputProps {
  onSendMessage: (user: User, channelId: string, message: string) => Promise<void>
}

/**
 * チャット入力
 */
const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(({ onSendMessage }, ref) => {
  // Reduxからユーザー情報を取得
  const user = useAppSelector((state) => state.user)
  // チャンネルIDの取得
  const channelId = useAppSelector((state) => state.channel.id)
  // メッセージの状態管理
  const [message, setMessage] = useState<string>('')
  // 入力フィールドの参照
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => {
    return {
      /**
       * フォーカスを当てる
       */
      focus() {
        inputRef.current?.focus()
      },
    }
  }, [])

  /**
   * メッセージ送信
   *
   * @param e フォームイベント
   */
  const handleSubmit = (e: FormEvent) => {
    // フォームのデフォルトの送信を防ぐ
    e.preventDefault()

    // メッセージとチャンネルIDが空でない場合に送信
    if (message.trim() && channelId && user) {
      // メッセージを送信
      onSendMessage(user as User, channelId, message)
      // メッセージをリセット
      setMessage('')
    }
  }

  return (
    <div className={styles.chatInput}>
      <AddCircleOutLineIcon variant="lightgray" />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="メッセージを送信"
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className={styles.chatInputButton}></button>
      </form>
      <div className={styles.chatInputIcons}>
        <CardGiftcardIcon variant={'lightgray'} />
        <GifIcon variant={'lightgray'} />
        <EmojiEmotionsIcon variant={'lightgray'} />
      </div>
    </div>
  )
})

export default ChatInput
