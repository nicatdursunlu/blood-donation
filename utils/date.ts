import { format } from 'date-fns'

export const getFormattedDate = (date: Date) => {
  return date ? format(new Date(date), 'dd.MM.yyyy') : ''
}
