import { formatValueWithLeadingZero } from '../helpers/formatValueWithLeadingZero'
import { setLetterCase } from '../helpers/setLetterCase'
import { ITimeOptions } from '../types'

/**
 * Object for valid time formats.
 */
const ValidTimeFormats = {
  HH_MM_SS: 'hh:mm:ss',
  HH_MM: 'hh:mm',
  MM_SS: 'mm:ss',
} as const

/**
 * Returns a formatted time string based on the provided options.
 *
 * {@link ITimeOptions Options}
 * @param {ITimeOptions} options - Configuration options for the function.
 * @returns {string} Formatted time string.
 *
 * @example
 * ```js
 * getFormattedTime({
 *   time: new Date().getTime(),
 *   sep: ':',
 *   format: 'hh:mm:ss',
 *   meridiem: {
 *     format: '24h',
 *     case: 'uppercase',
 *     position: 'end'
 *   }
 * })
 * ```
 */
export const getFormattedTime = ({ time = new Date().getTime(), sep = ':', format = 'hh:mm:ss', meridiem = { format: '24h' } }: ITimeOptions): string => {
  if (!Object.values(ValidTimeFormats).includes(format)) {
    throw new Error('Invalid time format')
  }

  if (sep.length !== 1) {
    throw new Error('Separator must be a single character')
  }

  if (meridiem.format === '24h' && (meridiem.case || meridiem.position)) {
    console.warn("When using the 24-hour format, 'position' and 'case' parameters are not necessary. They are only relevant for the 12-hour format.")
  }

  const date = parseTimeInput(time)

  const HOURS = date.getHours()
  const MINUTES = date.getMinutes()
  const SECONDS = date.getSeconds()
  const is12HourFormat = meridiem.format === '12h'

  const formattedHours = formatHours(HOURS, is12HourFormat)
  const formattedTimeParts = []

  if (format.includes('hh')) {
    formattedTimeParts.push(formatValueWithLeadingZero(formattedHours))
  }

  if (format.includes('mm')) {
    formattedTimeParts.push(formatValueWithLeadingZero(MINUTES))
  }

  if (format.includes('ss')) {
    formattedTimeParts.push(formatValueWithLeadingZero(SECONDS))
  }

  const result = formattedTimeParts.join(sep)

  let period = is12HourFormat ? getPeriod(HOURS) : ''

  period = setLetterCase(period, meridiem.case)

  if (meridiem.position === 'start' && is12HourFormat) {
    return `${period} ${result}`
  }

  if (is12HourFormat) {
    return `${result} ${period}`
  }

  return result
}

/**
 * Parses time input into a Date object.
 *
 * @param time The time input (Date, number, or string).
 * @returns A Date object representing the time.
 */
const parseTimeInput = (time: ITimeOptions['time']): Date => {
  if (typeof time === 'number') {
    return new Date(time)
  } else if (typeof time === 'string') {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(time)) {
      return new Date(time)
    }
    const timeParts = time.split(':').map(Number)
    if (timeParts.some(isNaN)) {
      throw new Error('Invalid time string format')
    }
    switch (timeParts.length) {
      case 2:
        return new Date(0, 0, 0, timeParts[0], timeParts[1])
      case 3:
        return new Date(0, 0, 0, timeParts[0], timeParts[1], timeParts[2])
      default:
        throw new Error('Invalid time string format')
    }
  } else {
    return time || new Date()
  }
}

/**
 * Formats hours based on the 12-hour format flag.
 *
 * @param hours Hours.
 * @param is12HourFormat Whether to use 12-hour format.
 * @returns Formatted hours.
 */
const formatHours = (hours: number, is12HourFormat: boolean): number => {
  if (is12HourFormat) {
    return hours % 12 || 12
  }
  return hours
}

/**
 * Gets AM/PM period based on hours.
 *
 * @param hours Hours.
 * @returns 'am' or 'pm'.
 */
const getPeriod = (hours: number): string => {
  return hours >= 12 ? 'PM' : 'AM'
}
