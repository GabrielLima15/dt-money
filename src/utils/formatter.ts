import { format } from 'date-fns';

export const dateFormatter = {
  format: (date: Date) => format(new Date(date), 'dd/MM/yyyy HH:mm:ss'),
}

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
