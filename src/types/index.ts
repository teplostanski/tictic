export type TDate = Date | string

export type TLetterCase = 'capitalize' | 'uppercase' | 'lowercase' | undefined

type TPosition = 'start' | 'end'

/**
 * Options for time formatting.
 * @remarks `?` - means an `optional` parameter
 */
export interface ITimeOptions {
  /**
   * @param time - Time in milliseconds since the Unix Epoch. Defaults to the current time. @default new Date().getTime()
   */
  time?: TDate | number
  /**
   * @param sep Separator character to use between time units. @default ':'
   */
  sep?: string
  /**
   * @param format Format in which the time should be returned.
   * Possible formats include `hh:mm:ss`, `hh:mm`, etc. @default 'hh:mm:ss'
   */
  format?: 'hh:mm:ss' | 'hh:mm' | 'mm:ss'

  /**
   * @param meridiem The object of the AM/PM parameters
   */
  meridiem?: {
    /**
     * @param meridiem.format Choose between '12h' or '24h' format. @default `'24h'`
     */
    format: '12h' | '24h'
    /**
     * @param meridiem.case Changes the case of AM/PM (capitalize, uppercase, lowercase)
     */
    case?: TLetterCase

    /**
     * @param meridiem.position Sets the position of AM/PM (start or end)
     */
    position?: TPosition
  }
}

/**
 * Options for date formatting.
 * @remarks `?` - means an `optional` parameter
 */
export interface IDateOptions {
  /**
   * @param date Accepts the same input as the native `new Date()`. @see {@link https://www.w3schools.com/js/js_date_formats.asp} @default new Date()
   */
  date?: TDate

  /**
   * @param sep Separator character to use between time units. @default '.'
   */
  sep?: string

  /**
   * @param format Date output format @default 'YYYY-MM-DD'
   */
  format?: 'YYYY-MM-DD' | 'YYYY-DD-MM' | 'MM-DD-YYYY' | 'DD-MM-YYYY' | 'YY-MM-DD' | 'YY-DD-MM' | 'MM-DD-YY' | 'DD-MM-YY'

  /**
   * @param exclude Exception Object @default { year: false, month: false, day: false, zero: false }
   */
  exclude?: {
    /**
     * @param exclude.year Excludes year
     */
    year?: boolean

    /**
     * @param exclude.month Excludes month
     */
    month?: boolean

    /**
     * @param exclude.day Excludes day
     */
    day?: boolean

    /**
     * @param exclude.zero Excludes 0 at the beginning of the month or day if the number is less than 10
     */
    zero?: boolean
  }

  /**
   * @param nameOfMonths Array with month names - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] @default null
   */
  nameOfMonths?: Array<string> | null

  /**
   * @param weekDays The object of the days of the week parameters @default  {
      set: false,
      locale: 'en',
      format: 'long',
      case: 'capitalize',
      position: 'start',
    }
   */
  weekDays?: {
    /**
     * @param weekDays.set Responsible for displaying the day of the week @default `'false'`
     */
    set: boolean

    /**
     * @param weekDays.locale Localization of the days of the week, accepts the same input as the native method `Date.toLocaleString': 'ru' | 'en'`, etc. @default `'en'`
     */
    locale: string
    /**
     * @param weekDays.format The output format of the days of the week, accepts the same input as the native method `Date.toLocaleString`: 'long' | 'short' | 'narrow' @default `'long'`
     */
    format: 'long' | 'short' | 'narrow' | undefined
    /**
     * @param weekDays.case Letter case: 'capitalize' | 'uppercase' | 'lowercase' @default `'capitalize'`
     */
    case: TLetterCase
    /**
     * @param weekDays.position Position of the day of the week relative to the date: 'start' | 'end' @default `'start'`
     */
    position: TPosition
  }

  /**
   * @param incDay Increases by `n` days
   */
  incDay?: number

  /**
   * @param decDay Decrease by `n` days
   */
  decDay?: number
}
