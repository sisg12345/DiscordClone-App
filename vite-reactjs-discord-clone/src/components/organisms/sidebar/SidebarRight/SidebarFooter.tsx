import styles from '../Sidebar.module.scss'
import { HeadphonesIcon, MicIcon, SettingIcon } from '@/components/atoms/icons/Icons'
import { useAppSelector } from '@/hooks/useRedux'

interface SidebarFooterProps {
  onOpenSetUserModal: () => void
}

/**
 * サイドバーのフッター
 */
export default function SidebarFooter({ onOpenSetUserModal }: SidebarFooterProps) {
  // Reduxからユーザー情報を取得
  const user = useAppSelector((state) => state.user)

  return (
    <footer className={styles.sidebarFooter}>
      <div className={styles.sidebarAccount}>
        <img src={user?.photoURL ?? ''} alt="user" id="basic-menu" />
        <div className={styles.userAccount}>
          <div className={styles.userAccountName}>{user?.displayName}</div>
          <span>#{user?.id?.substring(0, 4) ?? ''}</span>
        </div>
      </div>
      <div className={styles.sidebarVoice}>
        <MicIcon />
        <HeadphonesIcon />
        <SettingIcon onClick={onOpenSetUserModal} />
      </div>
    </footer>
  )
}
