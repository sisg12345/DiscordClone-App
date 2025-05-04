import styles from './Modal.common.module.scss'
import Separator from '@/components/atoms/separators/Separator'
import { DeleteIcon, HighlightOffIcon } from '@/components/atoms/icons/Icons'
import { FormEvent, useEffect, useState } from 'react'
import LabeledInput from '@/components/molecules/inputs/LabeledInput'
import LabeledTextArea from '@/components/molecules/inputs/LabeledTextArea'
import HoverItemBox from '@/components/layouts/boxes/HoverBox'
import Button from '@/components/atoms/buttons/Button'
import type { Channel } from '@/types/data'

interface SetChannelModalProps {
  channel: Channel
  isOpen: boolean
  onClose: () => void
  onSubmit: (channelName: string, channelTopic: string) => Promise<void>
  onDeleteChannel: () => Promise<void>
}

/**
 * チャンネル設定モーダル
 */
export default function SetChannelModal({
  channel,
  isOpen,
  onClose,
  onSubmit,
  onDeleteChannel,
}: SetChannelModalProps) {
  // 送信ボタンの状態を管理
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  // チャンネル情報
  const { channelName, channelTopic } = channel
  // チャンネル名の状態管理
  const [inputChannelName, setChannelName] = useState<string>(channelName)
  // チャンネルトピックの状態管理
  const [inputChannelTopic, setInputChannelTopic] = useState<string>(channelTopic ?? '')

  /**
   * チャンネル編集をキャンセル
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
   * チャンネルを削除
   *
   * @param e * フォームのイベント
   */
  const handleDelete = () => {
    // チャンネルを削除
    onDeleteChannel()
    // モーダルを閉じる
    onClose()
  }

  /**
   * チャンネル情報を送信
   */
  const handleSubmit = (e: FormEvent) => {
    // フォームのデフォルトの送信を防ぐ
    e.preventDefault()
    // チャンネルを更新
    onSubmit(inputChannelName, inputChannelTopic)
    // モーダルを閉じる
    onClose()
  }

  /**
   * チャンネル情報をリセット
   */
  const handleReset = () => {
    // チャンネル名をリセット
    setChannelName(channelName)
    // チャンネルトピックをリセット
    setInputChannelTopic(channelTopic ?? '')
  }

  useEffect(() => {
    // チャンネル名をリセット
    setChannelName(channelName)
    // チャンネルトピックをリセット
    setInputChannelTopic(channelTopic ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    // チャンネル名が空でない場合に送信ボタンを有効化
    if (inputChannelName.trim().length > 0) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }, [inputChannelName])

  // モーダルが開いていない場合は何も表示しない
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.modalOverlay}>
      <aside className={styles.modalSidebar}>
        <HoverItemBox>概要</HoverItemBox>
        <Separator />
        <HoverItemBox className={styles.modalSidebarWithIcon} color="danger" onClick={handleDelete}>
          <span>チャンネルを削除</span>
          <DeleteIcon variant="danger" />
        </HoverItemBox>
      </aside>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalOffIcon} onClick={onClose}>
            <HighlightOffIcon size="large" />
            <span>Esc</span>
          </div>
          <div className={styles.modalHeader}>
            <h1>概要</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <LabeledInput
              id="channelName"
              label="チャンネル名"
              type="text"
              maxLength={200}
              value={inputChannelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <Separator marginHeight="large" />
            <LabeledTextArea
              id="channelTopic"
              label="チャンネルトピック"
              rows={10}
              maxLength={1024}
              value={inputChannelTopic}
              onChange={(e) => setInputChannelTopic(e.target.value)}
            ></LabeledTextArea>
            <div className={styles.modalFooter}>
              <div>
                <Button variant="cancel" onClick={handleReset}>
                  リセット
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                >
                  変更を保存
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
