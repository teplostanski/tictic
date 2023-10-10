export type TDate = Date | string

type TCommontDateTimeTypes = {
  /**
   * @default new Date()
   */
  date?: TDate
  sep?: string
}

export type TLetterCase = 'capitalize' | 'uppercase' | 'lowercase'

export type TGetDate = TCommontDateTimeTypes & {
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
