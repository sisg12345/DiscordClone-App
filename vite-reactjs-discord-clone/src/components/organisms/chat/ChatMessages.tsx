import styles from './Chat.module.scss'
import ChatMessage from './ChatMessage'
import type { ChatMessage as ChatMessageType } from '@/types/data'

interface ChatMessagesProps {
  chatMessages: ChatMessageType[]
  onEditMessage: (channelId: string, messageId: string, message: string) => Promise<void>
  onDeleteMessage: (channelId: string, messageId: string) => Promise<void>
}

/**
 * チャットメッセージ一覧
 */
export default function ChangeMessages({
  chatMessages,
  onEditMessage,
  onDeleteMessage,
}: ChatMessagesProps) {
  return (
    <div className={styles.chatMessages}>
      {chatMessages.map(({ id, user, message, isEdited, updatedAt }) => (
        <ChatMessage
          key={id}
          id={id}
          user={user}
          message={message}
          isEdited={isEdited}
          updatedAt={updatedAt}
          onEditMessage={onEditMessage}
          onDeleteMessage={onDeleteMessage}
        />
      ))}
    </div>
  )
}
