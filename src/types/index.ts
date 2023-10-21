export type TDate = Date | string

type TCommontDateTimeTypes = {
  /**
   * @default new Date()
   */
  date?: TDate
  sep?: string
}

export type TLetterCase = 'capitalize' | 'uppercase' | 'lowercase'

/**
 * Options for time formatting.
 */
export type TTimeOptions = {
  /**
   * @param time - Time in milliseconds since the Unix Epoch. Defaults to the current time.
   */
  time?: TDate | number
  /**
   * @param sep lffffsdfsd
   */
  sep?: string
  format?: 'hh:mm:ss' | 'hh:mm:ss 12h' | 'hh:mm' | 'hh:mm 12h' | 'mm:ss' | 'mm:ss 12h'
}

export type TDateOptions = TCommontDateTimeTypes & {
  /**
   * @default 'YYYY-MM-DD'
   */
  format?: 'YYYY-MM-DD' | 'YYYY-DD-MM' | 'MM-DD-YYYY' | 'DD-MM-YYYY' | 'YY-MM-DD' | 'YY-DD-MM' | 'MM-DD-YY' | 'DD-MM-YY'
  /**
   * @default { year: false, month: false, day: false, zero: false }
   */
  exclude?: { year?: boolean; month?: boolean; day?: boolean; zero?: boolean }
  /**
   * @default null
   */
  nameOfMonths?: Array<string> | null
  /**
   * @default {
      set: false,
      locale: 'ru',
      format: 'long',
      case: 'capitalize',
      position: 'start',
    }
   */
  weekDays?: {
    set: boolean
    locale: string
    format: 'long' | 'short' | 'narrow' | undefined
    case: TLetterCase
    position: 'start' | 'end'
  }
  incDay?: number
  decDay?: number
}
