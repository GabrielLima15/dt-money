import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContext, useContextSelector } from 'use-context-selector'
import { Trash } from 'phosphor-react'
import { useState } from 'react'

export function Transactions() {
  const { transactions, deleteTransaction } = useContext(TransactionsContext);

  const [showDeleteIcon, setShowDeleteIcon] = useState(false);


  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
      <tbody>
        {Array.isArray(transactions) &&
          transactions.map((transaction) => {
            if (!transaction) {
              return null;
            }

            return (
              <tr
                key={transaction.id}
                onMouseEnter={() => setShowDeleteIcon(true)} // Mostrar ícone ao passar o mouse
                onMouseLeave={() => setShowDeleteIcon(false)} // Esconder ícone ao tirar o mouse
              >
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>
                  {dateFormatter.format(
                    new Date(new Date(transaction.createdAt).toISOString())
                  )}
                </td>
                <td>
                  {showDeleteIcon && (
                    <Trash
                      onClick={() => deleteTransaction(transaction.id)}
                      size={20}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
