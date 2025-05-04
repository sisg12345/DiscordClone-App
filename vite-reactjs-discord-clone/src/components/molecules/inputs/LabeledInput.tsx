import Input from '@/components/atoms/inputs/Input'
import Label from '@/components/atoms/labels/Label'
import InputBox from '@/components/layouts/boxes/InputBox'
import { InputHTMLAttributes } from 'react'

interface LabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

/**
 * ラベル付きの入力フィールド
 */
export default function LabeledInput({ id, label, ...props }: LabelInputProps) {
  return (
    <>
      <Label id={id}>{label}</Label>
      <InputBox>
        <Input id={id} {...props} />
      </InputBox>
    </>
  )
}
