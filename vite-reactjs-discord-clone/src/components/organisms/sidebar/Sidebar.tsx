import styles from './Sidebar.module.scss'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight/SidebarRight'
import type { Channel } from '@/types/data'

interface SidebarProps {
  channels: Channel[]
  onOpenAddChannel: () => void
  onOpenSetChannel: (channelId: string) => void
  onOpenSetUserModal: () => void
}

/**
 * サイドバー
 */
export default function Sidebar({
  channels,
  onOpenAddChannel,
  onOpenSetChannel,
  onOpenSetUserModal,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <SidebarLeft />
      <SidebarRight
        channels={channels}
        onOpenSetUserModal={onOpenSetUserModal}
        onOpenAddChannel={onOpenAddChannel}
        onOpenSetChannel={onOpenSetChannel}
      />
    </aside>
  )
}
