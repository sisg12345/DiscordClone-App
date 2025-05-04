import styles from '../Sidebar.module.scss'
import SidebarChanels from './SidebarChanels'
import SidebarFooter from './SidebarFooter'
import SidebarHeader from './SidebarHeader'
import type { Channel } from '@/types/data'

interface SidebarRightProps {
  channels: Channel[]
  onOpenAddChannel: () => void
  onOpenSetChannel: (channelId: string) => void
  onOpenSetUserModal: () => void
}

/**
 * サイドバー右
 */
export default function SidebarRight({
  channels,
  onOpenAddChannel,
  onOpenSetChannel,
  onOpenSetUserModal,
}: SidebarRightProps) {
  return (
    <div className={styles.sidebarRight}>
      <SidebarHeader />
      <SidebarChanels
        channels={channels}
        onOpenAddChannel={onOpenAddChannel}
        onOpenSetChannel={onOpenSetChannel}
      />
      <SidebarFooter onOpenSetUserModal={onOpenSetUserModal} />
    </div>
  )
}
