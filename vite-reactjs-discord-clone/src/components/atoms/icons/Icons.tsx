import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import {
  AccountCircle,
  Add,
  AddCircleOutline,
  CardGiftcard,
  Delete,
  Edit,
  EmojiEmotions,
  ExpandMore,
  Gif,
  Headphones,
  Help,
  HighlightOff,
  Logout,
  Mic,
  MoreHoriz,
  Notifications,
  PeopleAlt,
  PushPin,
  Search,
  Send,
  Settings,
} from '@mui/icons-material'
import { COLOR, FONT_SIZE } from '@/constants/style'

interface Variant {
  variant?: 'danger' | 'black' | 'gray' | 'lightgray'
  size?: 'small' | 'normal' | 'medium' | 'large'
}

/**
 * アイコンの共通ラップ処理
 *
 * @param Icon アイコンコンポーネント
 * @returns レンダリングコンポーネント
 */
const withIconStyle = (Icon: typeof SvgIcon) => {
  return (props: SvgIconProps & Variant) => {
    // variantの値に応じて色を変更
    const variant = props.variant || 'gray'
    // 色
    let color = ''

    switch (variant) {
      case 'black':
        color = COLOR.BLACK
        break
      case 'lightgray':
        color = COLOR.LIGHT_GRAY
        break
      case 'danger':
        color = COLOR.DANGER
        break
      default:
        // gray
        color = COLOR.GRAY
    }

    // sizeの値に応じてサイズを変更
    const size = props.size || 'normal'
    // sizeのサイズ
    let fontSize = ''

    switch (size) {
      case 'small':
        fontSize = FONT_SIZE.SMALL
        break
      case 'medium':
        fontSize = FONT_SIZE.MEDIUM
        break
      case 'large':
        fontSize = FONT_SIZE.LARGE
        break
      default:
        // normal
        fontSize = FONT_SIZE.NORMAL
    }

    return (
      <Icon
        {...props}
        sx={{
          fontSize,
          color,
          cursor: 'pointer',
          ...props.sx,
        }}
      />
    )
  }
}

/**
 * 展開アイコン
 */
export const ExpandMoreIcon = withIconStyle(ExpandMore)

/**
 * 追加アイコン
 */
export const AddIcon = withIconStyle(Add)

/**
 * 追加アイコン (丸)
 */
export const AddCircleOutLineIcon = withIconStyle(AddCircleOutline)

/**
 * マイクアイコン
 */
export const MicIcon = withIconStyle(Mic)

/**
 * ヘッドフォンアイコン
 */
export const HeadphonesIcon = withIconStyle(Headphones)

/**
 * 設定アイコン
 */
export const SettingIcon = withIconStyle(Settings)

/*
 * 通知アイコン
 */
export const NotificationIcon = withIconStyle(Notifications)

/**
 * ピンアイコン
 */
export const PushPinIcon = withIconStyle(PushPin)

/**
 * ピープルアイコン
 */
export const PeopleIcon = withIconStyle(PeopleAlt)

/**
 * 検索アイコン
 */
export const SearchIcon = withIconStyle(Search)

/**
 * 送信アイコン
 */
export const SendIcon = withIconStyle(Send)

/**
 * ヘルプアイコン
 */
export const HelpIcon = withIconStyle(Help)

/**
 * カードギフトアイコン
 */
export const CardGiftcardIcon = withIconStyle(CardGiftcard)

/**
 * gifアイコン
 */
export const GifIcon = withIconStyle(Gif)

/**
 * 絵文字アイコン
 */
export const EmojiEmotionsIcon = withIconStyle(EmojiEmotions)

/**
 * アカウントアイコン (丸)
 */
export const AccountCircleIcon = withIconStyle(AccountCircle)

/**
 * もっと見るアイコン
 */
export const MoreHorizIcon = withIconStyle(MoreHoriz)

/**
 * 編集アイコン
 */
export const EditIcon = withIconStyle(Edit)

/**
 * 削除アイコン
 */
export const DeleteIcon = withIconStyle(Delete)

/**
 * ハイライトオフアイコン
 */
export const HighlightOffIcon = withIconStyle(HighlightOff)

/**
 * ログアウトアイコン
 */
export const LogoutIcon = withIconStyle(Logout)
