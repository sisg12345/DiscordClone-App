import styles from './Separator.module.scss'

interface SeparatorProps {
  marginHeight?: 'normal' | 'large' | 'extraLarge'
}

/**
 * セパレーター
 */
export default function Separator({ marginHeight = 'normal' }: SeparatorProps) {
  // marginHeightの値に応じてクラス名を変更
  let marginStyle = ''

  switch (marginHeight) {
    case 'large':
      marginStyle = styles.marginHeightLarge
      break
    case 'extraLarge':
      marginStyle = styles.marginHeightExtraLarge
      break
    default:
      // normal
      marginStyle = styles.marginHeightNormal
  }

  return <div className={`${styles.separator} ${marginStyle}`}></div>
}
