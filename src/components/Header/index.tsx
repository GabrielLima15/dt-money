import logoImg from '../../assets/Logo.svg'
import { HeaderContainer, HeaderContent, NewTransactionsButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import Logo from '../../assets/Logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionsButton>Nova transação</NewTransactionsButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
