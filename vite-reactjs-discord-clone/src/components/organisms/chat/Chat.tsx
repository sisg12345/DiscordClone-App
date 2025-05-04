import styles from './Chat.module.scss'
import { useAppSelector } from '@/hooks/useRedux'
import ChatHeader from './ChatHeader'
import type { ChatInputRef } from './ChatInput'
import ChatMessages from './ChatMessages'
import type { ChatMessage, User } from '@/types/data'
import { useEffect, useRef } from 'react'
import ChatInput from './ChatInput'

interface ChatProps {
  chatMessages: ChatMessage[]
  searchChatMessages: (channelId: string) => void
  onSendMessage: (user: User, channelId: string, message: string) => Promise<void>
  onEditMessage: (channelId: string, messageId: string, message: string) => Promise<void>
  onDeleteMessage: (channelId: string, messageId: string) => Promise<void>
}

/**
 * チャット
 */
export default function Chat({
  chatMessages,
  searchChatMessages,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
}: ChatProps) {
  // チャンネル情報の取得
  const { id: channelId, channelName } = useAppSelector((state) => state.channel)
  // チャット入力フィールドの参照
  const chatInputRef = useRef<ChatInputRef>(null)

  useEffect(() => {
    // チャンネルIDが変更された場合にメッセージを取得
    if (channelId) {
      searchChatMessages(channelId)
      // チャット入力フィールドにフォーカス
      if (chatInputRef.current) {
        chatInputRef.current.focus()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId])

  return (
    <main className={styles.chat}>
      <ChatHeader channelName={channelName} />
      <ChatMessages
        chatMessages={chatMessages}
        onEditMessage={onEditMessage}
        onDeleteMessage={onDeleteMessage}
      />
      <ChatInput ref={chatInputRef} onSendMessage={onSendMessage} />
    </main>
  )
}
