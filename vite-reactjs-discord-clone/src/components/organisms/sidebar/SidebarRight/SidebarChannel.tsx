import styles from '../Sidebar.module.scss'
import HoverItemBox from '@/components/layouts/boxes/HoverItemBox'
import { SettingIcon } from '@/components/atoms/icons/Icons'
import { useAppDispatch } from '@/hooks/useRedux'
import { setChannelInfo } from '@/stores/slices/channelSlice'

interface SidebarChannelProps {
  channelId: string
  channelName: string
  onOpenSetChannel: (channelId: string) => void
}

/**
 * サイドバーチャンネル
 */
export default function SidebarChannel({
  channelId,
  channelName,
  onOpenSetChannel,
}: SidebarChannelProps) {
  // Reduxのdispatchフック
  const dispatch = useAppDispatch()

  /**
   * チャンネル変更
   *
   * @param channelId チャンネルID
   * @param channelName チャンネル名
   */
  const handleChangeChannel = (channelId: string, channelName: string): void => {
    dispatch(setChannelInfo({ id: channelId, channelName }))
  }

  return (
    <>
      <HoverItemBox
        className={styles.sidebarChannelName}
        onClick={() => handleChangeChannel(channelId, channelName)}
      >
        <div>
          <span className={styles.sidebarChannelHash}>#</span>
          {channelName}
        </div>
        <SettingIcon onClick={() => onOpenSetChannel(channelId)} />
      </HoverItemBox>
    </>
  )
}
