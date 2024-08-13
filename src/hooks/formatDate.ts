import { set } from "date-fns"

export function formatDate(time: string, date: Date) {
  const hour = Number(time.split(":")[0])
  const minute = Number(time.split(":")[1])
  return set(date, { hours: hour, minutes: minute })
}
