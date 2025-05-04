import styles from './Chat.module.scss'
import SearchInput from '@/components/molecules/inputs/SearchInput'
import {
  HelpIcon,
  NotificationIcon,
  PeopleIcon,
  PushPinIcon,
  SendIcon,
} from '@/components/atoms/icons/Icons'

interface ChatHeaderProps {
  channelName: string | null
}

/**
 * チャットヘッダー
 */
export default function ChatHeader({ channelName }: ChatHeaderProps) {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.chatHeaderLeft}>
        <span className={styles.chatHeaderHash}>#</span>
        {channelName}
      </div>
      <div className={styles.chatHeaderRight}>
        <NotificationIcon />
        <PushPinIcon />
        <PeopleIcon />
        <SearchInput />
        <SendIcon />
        <HelpIcon />
      </div>
    </div>
  )
}
