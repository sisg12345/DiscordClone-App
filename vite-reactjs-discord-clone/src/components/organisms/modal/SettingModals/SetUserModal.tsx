import commonStyles from './Modal.common.module.scss'
import styles from './SetUserModal.module.scss'
import Separator from '@/components/atoms/separators/Separator'
import { HighlightOffIcon, LogoutIcon } from '@/components/atoms/icons/Icons'
import HoverItemBox from '@/components/layouts/boxes/HoverItemBox'
import Button from '@/components/atoms/buttons/Button'
import { useAppSelector } from '@/hooks/useRedux'

interface SetUserModalProps {
  isOpen: boolean
  onClose: () => void
  onDeleteAccount: () => void
  onLogout: () => void
}

/**
 * ユーザー情報設定モーダル
 */
export default function SetUserModal({
  isOpen,
  onClose,
  onDeleteAccount,
  onLogout,
}: SetUserModalProps) {
  // Reduxからユーザー情報を取得
  const { id, email, displayName, photoURL } = useAppSelector((state) => state.user)
  /**
   * 画面キャンセル
   */
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      if (isOpen) {
        // モーダルを閉じる
        onClose()
      }
    }
  })

  /**
   * アカウントを削除
   *
   * @param e * フォームのイベント
   */
  const handleDelete = () => {
    // アカウントを削除
    onDeleteAccount()
    // モーダルを閉じる
    onClose()
  }

  // モーダルが開いていない場合は何も表示しない
  if (!isOpen) {
    return null
  }

  return (
    <div className={commonStyles.modalOverlay}>
      <aside className={commonStyles.modalSidebar}>
        <HoverItemBox>マイアカウント</HoverItemBox>
        <Separator />
        <HoverItemBox className={commonStyles.modalSidebarWithIcon} onClick={onLogout}>
          <span>ログアウト</span>
          <LogoutIcon />
        </HoverItemBox>
      </aside>
      <div className={commonStyles.modalContainer}>
        <div className={commonStyles.modalContent}>
          <div className={commonStyles.modalOffIcon} onClick={onClose}>
            <HighlightOffIcon size="large" />
            <span>Esc</span>
          </div>
          <div className={commonStyles.modalHeader}>
            <h1>マイアカウント</h1>
          </div>
          <div className={styles.modalBody}>
            <img src={photoURL ?? ''} alt="user" />
            <div className={styles.userInfo}>
              <div>
                <h2>ユーザーID</h2>
                <span>#{id}</span>
              </div>
              <div>
                <h2>表示名</h2>
                <span>{displayName}</span>
              </div>
              <div>
                <h2>メールアドレス</h2>
                <span>{email}</span>
              </div>
            </div>
          </div>
          <div className={commonStyles.modalFooter}>
            <Button type="button" variant="danger" onClick={handleDelete}>
              アカウントを削除
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
