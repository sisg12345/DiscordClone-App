import { useCallback, useEffect, useState } from 'react'
import AddChannelModal from '@/components/organisms/modal/AddChannelModal'
import Sidebar from '@/components/organisms/sidebar/Sidebar'
import Chat from '@/components/organisms/chat/Chat'
import useChannels from '@/hooks/useChannelsCollection'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { auth, db } from '@/lib/firebase/firebase'
import type { Channel, ChatMessage, User } from '@/types/data'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { setChannelInfo } from '@/stores/slices/channelSlice'
import SetChannelModal from '@/components/organisms/modal/SettingModals/SetChannelModal'
import SetUserModal from '@/components/organisms/modal/SettingModals/SetUserModal'
import { deleteUser, getAuth } from 'firebase/auth'

/**
 * チャンネルページ
 */
export default function Channels() {
  // Reduxのdispatchフック
  const dispatch = useAppDispatch()
  // チャンネル情報の取得
  const { id: channelId } = useAppSelector((state) => state.channel)
  // チャンネル追加モーダルの状態管理
  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false)
  // チャンネル設定モーダルの状態管理
  const [isSetChannelModalOpen, setIsSetChannelModalOpen] = useState(false)
  // ユーザー情報設定モーダルの除隊管理
  const [isSetUserModalOpen, setIsSetUserModalOpen] = useState(false)
  // チャットメッセージの状態管理
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  // チャンネル情報の状態管理
  const [channel, setChannel] = useState<Channel>({
    id: '',
    channelName: '',
    channelTopic: '',
  })
  const channels = useChannels()

  /**
   * チャンネル追加
   *
   * @param channelName チャンネル名
   */
  const handleAddChannel = async (channelName: string): Promise<void> => {
    await addDoc(collection(db, 'channels'), {
      channelName,
      channelTopic: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }

  /**
   * メッセージ送信
   *
   * @param user 送信ユーザー情報
   * @param channelId チャンネルID
   * @param message メッセージ
   */
  const handleSendMessage = async (
    user: User,
    channelId: string,
    message: string,
  ): Promise<void> => {
    // Firebaseのコレクションを取得
    const collectionRef = collection(db, 'channels', channelId, 'messages')
    // メッセージを追加
    await addDoc(collectionRef, {
      message,
      isEdited: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      user,
    })
  }

  /**
   * チャンネルのチャットメッセージを取得
   *
   * @param channelId チャンネルID
   */
  const searchChatMessages = useCallback((channelId: string) => {
    // Firebaseのコレクションを取得
    const collectionRef = collection(db, 'channels', channelId, 'messages')
    // ソート順を指定
    const collectionRefOrderby = query(collectionRef, orderBy('createdAt', 'desc'))

    // コレクションのスナップショットを監視
    onSnapshot(collectionRefOrderby, (querySnapshot) => {
      const messages: ChatMessage[] = []

      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          user: doc.data().user,
          message: doc.data().message,
          isEdited: doc.data().isEdited,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
        })
      })
      setChatMessages(messages)
    })
  }, [])

  /**
   * チャネルメッセージを編集
   *
   * @param id メッセージID
   * @param message メッセージ
   */
  const handleEditMessage = async (
    channelId: string,
    messageId: string,
    message: string,
  ): Promise<void> => {
    // Firebaseのドキュメントを取得
    const documentRef = doc(db, 'channels', channelId, 'messages', messageId)
    // メッセージを追加
    await updateDoc(documentRef, {
      message,
      isEdited: true,
      updatedAt: serverTimestamp(),
    })
  }

  /**
   * チャンネルメッセージを削除
   *
   * @param id メッセージID
   */
  const handleDeleteMessage = async (channelId: string, messageId: string): Promise<void> => {
    // Firebaseのドキュメントを取得
    const documentRef = doc(db, 'channels', channelId, 'messages', messageId)
    // メッセージを削除
    await deleteDoc(documentRef)
  }

  /**
   * チャンネル情報を更新
   *
   * @param channelName チャンネル名
   * @param channelTopic チャンネルトピック
   */
  const handleUpdateChannel = async (channelName: string, channelTopic: string): Promise<void> => {
    if (channelId) {
      // Firebaseのドキュメントを取得
      const documentRef = doc(db, 'channels', channelId)
      // メッセージを追加
      await updateDoc(documentRef, {
        channelName,
        channelTopic,
        updatedAt: serverTimestamp(),
      })
    }
  }

  /**
   * チャンネルを削除
   */
  const handleDeleteChannel = async (): Promise<void> => {
    if (channelId) {
      // Firebaseのドキュメントを取得
      const documentRef = doc(db, 'channels', channelId)
      // メッセージを削除
      await deleteDoc(documentRef)
      // メッセージを削除
      setChatMessages([])
    }
  }

  /**
   * チャネル設定モーダルを開く時の処理
   */
  const handleOpenSetChannel = async (channelId: string): Promise<void> => {
    if (channelId) {
      // Firebaseのドキュメントを取得
      const documentRef = doc(db, 'channels', channelId)
      // チャンネル情報を取得
      const channel = await getDoc(documentRef)

      if (channel.exists()) {
        // チャンネル情報をセット
        setChannel({
          id: channel.id,
          channelName: channel.data().channelName,
          channelTopic: channel.data().channelTopic,
        })
      }
      // チャンネル設定モーダルを開く
      setIsSetChannelModalOpen(true)
    }
  }

  /**
   * アカウントを削除
   */
  const handledDeleteAccount = (): void => {
    // 認証情報を取得
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      deleteUser(user)
    }
  }

  /**
   * ログアウト
   */
  const handleLogout = (): void => {
    auth.signOut()
  }

  useEffect(() => {
    // チャンネルIDが存在しないもしくはチャンネルを削除した場合は、チャンネル一覧の最初のチャンネルを選択
    if (channelId == null && channels.length > 0) {
      const channel = channels[0]
      dispatch(setChannelInfo({ id: channel.id, channelName: channel.channelName }))

      return
    }
    if (channels.length === 0) {
      dispatch(setChannelInfo({ id: null, channelName: null }))

      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels])

  return (
    <>
      <Sidebar
        channels={channels}
        onOpenAddChannel={() => setIsAddChannelModalOpen(true)}
        onOpenSetChannel={handleOpenSetChannel}
        onOpenSetUserModal={() => setIsSetUserModalOpen(true)}
      />
      <Chat
        chatMessages={chatMessages}
        searchChatMessages={searchChatMessages}
        onSendMessage={handleSendMessage}
        onEditMessage={handleEditMessage}
        onDeleteMessage={handleDeleteMessage}
      />
      <AddChannelModal
        isOpen={isAddChannelModalOpen}
        onClose={() => setIsAddChannelModalOpen(false)}
        onSubmit={handleAddChannel}
      />
      <SetChannelModal
        channel={channel}
        isOpen={isSetChannelModalOpen}
        onClose={() => setIsSetChannelModalOpen(false)}
        onSubmit={handleUpdateChannel}
        onDeleteChannel={handleDeleteChannel}
      />
      <SetUserModal
        isOpen={isSetUserModalOpen}
        onClose={() => setIsSetUserModalOpen(false)}
        onLogout={handleLogout}
        onDeleteAccount={handledDeleteAccount}
      />
    </>
  )
}
