import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import type { Channel } from '@/types/data'
/**
 * チャンネルデータを取得するカスタムフック
 */
export default function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([])

  useEffect(() => {
    // Firebaseのコレクションを取得
    const collectionRef = query(collection(db, 'channels'))

    // ソート順を指定
    const collectionRefOrderby = query(collectionRef, orderBy('channelName'))

    // コレクションのスナップショットを監視
    const unsubscribe = onSnapshot(collectionRefOrderby, (querySnapshot) => {
      const channels: Channel[] = []

      querySnapshot.forEach((doc) => {
        channels.push({
          id: doc.id,
          channelName: doc.data().channelName,
        })
      })
      setChannels(channels)
    })

    // コレクションのスナップショットの監視を解除
    return () => unsubscribe()
  }, [])

  return channels
}
