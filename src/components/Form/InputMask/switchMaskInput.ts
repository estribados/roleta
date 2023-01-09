export type MaskProps = 'phone' | 'zip-code' | 'money' | 'cpf' | 'cnpj' | 'date'

export function switchMaskInput(mask: MaskProps) {
  switch (mask) {
    case 'date':
      return '99/99/9999'
    case 'phone':
      return '(99) 99999-9999'
    case 'cpf':
      return '999.999.999-99'
    case 'cnpj':
      return '99.999.999/9999-99'
    case 'zip-code':
      return '99999-999'

    default:
      return ''
  }
}
