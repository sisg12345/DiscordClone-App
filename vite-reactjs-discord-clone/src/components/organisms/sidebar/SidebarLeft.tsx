import styles from './Sidebar.module.scss'

/**
 * サイドバー左
 */
export default function SidebarLeft() {
  return (
    <div className={styles.sidebarLeft}>
      <div className={styles.serverIcon}>
        <img src="/discord-icon.png" alt="DisCord Icon" />
      </div>
    </div>
  )
}
