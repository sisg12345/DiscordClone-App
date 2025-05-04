import styles from '../Sidebar.module.scss'
import { ExpandMoreIcon } from '@/components/atoms/icons/Icons'

/**
 * サイドバーのヘッダー
 */
export default function SidebarHeader() {
  return (
    <div className={styles.sidebarTop}>
      <div>Workspace Name</div>
      <ExpandMoreIcon />
    </div>
  )
}
