import type { Channel, Nullable } from '@/types/data'
import { createSlice } from '@reduxjs/toolkit'

type NullableChannel = Nullable<Channel>

const initialState: NullableChannel = {
  id: null,
  channelName: null,
}

interface Action {
  payload: Nullable<Channel>
  type: string
}

/**
 * チャンネル情報のSlice
 */
export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannelInfo: (state, action: Action) => {
      state.id = action.payload.id
      state.channelName = action.payload.channelName
    },
    clearChannelInfo: () => initialState,
  },
})

export const { setChannelInfo, clearChannelInfo } = channelSlice.actions

export default channelSlice.reducer
