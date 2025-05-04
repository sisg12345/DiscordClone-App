import styles from '../Sidebar.module.scss'
import SidebarChannel from './SidebarChannel'
import { AddIcon } from '@/components/atoms/icons/Icons'
import type { Channel } from '@/types/data'

interface SidebarChanelsProps {
  channels: Channel[]
  onOpenAddChannel: () => void
  onOpenSetChannel: (channelId: string) => void
}

/**
 * サイドバーチャンネル一覧
 */
export default function SidebarChanels({
  channels,
  onOpenAddChannel,
  onOpenSetChannel,
}: SidebarChanelsProps) {
  return (
    <div className={styles.sidebarChannels}>
      <div className={styles.sidebarChannelsHeader}>
        <div className={styles.sidebarHeader}>
          <div>チャンネル</div>
        </div>
        <AddIcon onClick={onOpenAddChannel} />
      </div>
      {channels.length > 0 &&
        channels.map(({ id, channelName }) => (
          <SidebarChannel
            key={id}
            channelName={channelName}
            channelId={id}
            onOpenSetChannel={onOpenSetChannel}
          />
        ))}
    </div>
  )
}
