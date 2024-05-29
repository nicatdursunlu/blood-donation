import {
  format,
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getYear,
} from 'date-fns'

export const getFormattedDate = (date: Date) => {
  return date ? format(new Date(date), 'dd.MM.yyyy') : ''
}

export const getMessageTime = (time: number) => {
  const date = new Date(time)
  const hour = getHours(date)
  const minute = getMinutes(date)
  const day = getDate(date)
  const month = getMonth(date)
  const year = getYear(date)

  const currentTime = new Date()
  const currentDay = getDate(currentTime)

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
