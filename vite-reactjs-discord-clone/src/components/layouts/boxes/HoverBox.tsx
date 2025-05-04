import styles from './HoverItemBox.module.scss'
import { HTMLAttributes, PropsWithChildren } from 'react'

interface HoverItemBoxProps extends HTMLAttributes<HTMLDivElement> {
  color?: 'white' | 'danger'
}

/**
 * ホバーつき項目ボックス
 */
export default function HoverItemBox({
  color = 'white',
  children,
  ...props
}: PropsWithChildren<HoverItemBoxProps>) {
  // colorの値に応じてクラス名を変更
  let hoverStyle = ''

  switch (color) {
    case 'danger':
      hoverStyle = styles.hoverDanger
      break
    default:
      // white
      hoverStyle = styles.hoverWhite
  }

  /**
   * NOTE
   *
   * <div でclassName = `${styles.hover} {...props}`></div>
   * のように実装するとスタイルが上手く適応されないので変数経由でスタイルを設定している
   */
  props.className = `${props.className || ''} ${styles.hover} ${hoverStyle}`

  return <div {...props}>{children}</div>
}
