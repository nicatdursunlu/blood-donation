import { format } from 'date-fns'

export const getFormattedDate = (date: Date) => {
  return date ? format(new Date(date), 'dd.MM.yyyy') : ''
}

export const getMessageTime = (time: Date | string) => {
  const date = new Date(time)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  const currentTime = new Date()
  const currentDay = currentTime.getDate()

  let lastMessageTime = null

  const makeFormattedTime = (time: number) => {
    return time > 9 ? `${time}` : `0${time}`
  }

  if (day - currentDay === 0)
    lastMessageTime = `${makeFormattedTime(hour)} : ${makeFormattedTime(
      minute
    )}`
  else
    lastMessageTime = `${makeFormattedTime(day)}.${makeFormattedTime(
      month
    )}.${makeFormattedTime(year)}`

  return lastMessageTime
}
