import { formatValueWithLeadingZero } from '../helpers/formatValueWithLeadingZero'
import { setLetterCase } from '../helpers/setLetterCase'
import { IDateOptions, TDate } from '../types'

/**
 * The function returns a string with a formatted date
 *
 * {@link IDateOptions Options}
 * @param {IDateOptions} options Configuration Object
 * @returns {string} A string with a formatted date
 * @example
 * ```js
 * getFormattedDate({
 *  date: new Date(),
 *  sep: '-',
 *  format: 'DD-MM-YYYY',
 *  exclude: { year: false, month: false, day: false, zero: false },
 *  nameOfMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
 *  weekDays: {
 *    set: true,
 *    locale: 'en',
 *    format: 'short',
 *    case: 'uppercase',
 *    position: 'end'
 *  },
 *  incDay: 1
 * })
 *```
 */

export const getFormattedDate = (options: IDateOptions) => {
  const {
    date = new Date(),
    sep = '.',
    format = 'YYYY-MM-DD',
    exclude = { year: false, month: false, day: false, zero: false },
    nameOfMonths = null,
    weekDays = {
      set: false,
      locale: 'en',
      format: 'long',
      case: 'capitalize',
      position: 'start',
    },
    incDay,
    decDay,
  } = options

  const DATE = setDate(date)
  const DAY = getDay()
  const WEEKDAY = getWeekday()
  const MONTH = getMonth()
  const YEAR = getYear()
  const DMY = /DD-MM-YY/
  const YMD = /YY-MM-DD/
  const YDM = /YY-DD-MM/
  const MDY = /MM-DD-YY/

  let resultArray: any[] = []

  /**
   * Set the date, taking into account possible day increment or decrement.
   *
   * @param value The input date value
   * @returns The modified Date object
   */
  function setDate(value: TDate) {
    const date = new Date(value)
    incDay && date.setDate(date.getDate() + incDay)
    decDay && date.setDate(date.getDate() - decDay)
    return date
  }

  /**
   * Get the day of the month or return null if it's excluded.
   *
   * @returns The day of the month or null
   */
  function getDay() {
    if (exclude.day) return null
    return formatValueWithLeadingZero(DATE.getDate())
  }

  /**
   * Get the weekday with localization and formatting options.
   *
   * @returns The formatted weekday
   */
  function getWeekday() {
    const weekday = DATE.toLocaleString(weekDays.locale, {
      weekday: weekDays.format,
    })

    return setLetterCase(weekday, weekDays.case)
  }

  /**
   * Get the month or its name (if provided) or return null if it's excluded.
   *
   * @returns The month or its name
   */
  function getMonth() {
    if (exclude.month) return null
    if (nameOfMonths) return nameOfMonths[DATE.getMonth()]
    return formatValueWithLeadingZero(DATE.getMonth() + 1)
  }

  /**
   * Get the year or its shortened representation (if provided) or return null if it's excluded.
   *
   * @returns The year or its shortened representation
   */
  function getYear() {
    if (exclude.year) return null
    if (format.match(/YYYY/)) return DATE.getFullYear()
    return DATE.getFullYear().toString().substring(2)
  }

  /**
   * Add items to the result array at the specified position with an optional separator.
   *
   * @param value The array of items to add
   * @param position The position to add items ('start' or 'end')
   * @param sep The optional delimiter string
   */
  function addItemToResult(value: any[], position: string, sep?: string) {
    const array = value.filter((element: any) => element !== null)
    const string = sep ? array.join(sep) : array.join('')

    try {
      switch (position) {
        case 'start':
          resultArray = [string, ...resultArray]
          break
        case 'end':
          resultArray = [...resultArray, string]
          break
        default:
          throw new Error(
            'addItemToResult function takes an array of items with the first argument, takes the position of adding to the resulting array with the second argument: "start" or "end", the third argument (optional) is a delimited string',
          )
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (format.match(DMY)) {
    addItemToResult([DAY, MONTH, YEAR], 'start', sep)
  }
  if (format.match(YMD)) {
    addItemToResult([YEAR, MONTH, DAY], 'start', sep)
  }
  if (format.match(YDM)) {
    addItemToResult([YEAR, DAY, MONTH], 'start', sep)
  }
  if (format.match(MDY)) {
    addItemToResult([MONTH, DAY, YEAR], 'start', sep)
  }

  weekDays.set && addItemToResult([WEEKDAY], weekDays.position)

  return resultArray.join(' ')
}
