import TextArea from '@/components/atoms/inputs/TextArea'
import Label from '@/components/atoms/labels/Label'
import InputBox from '@/components/layouts/boxes/InputBox'
import { TextareaHTMLAttributes } from 'react'

interface LabeledTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
}

/**
 * ラベル付きの入力テキストエリア
 */
export default function LabeledTextArea({ id, label, ...props }: LabeledTextAreaProps) {
  return (
    <>
      <Label id={id}>{label}</Label>
      <InputBox>
        <TextArea id={id} {...props}></TextArea>
      </InputBox>
    </>
  )
}
