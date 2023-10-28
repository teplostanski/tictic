export type TimeUnit = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days'

export interface TimerOptions {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
  locale?: 'ru' | 'en'
  showWords?: boolean
  sep?: string
  leadingZeros?: boolean
}

export interface TimerInstance {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  toString: () => string
  start: (callback?: () => void) => void
  stop: () => void
  getTime: () => {
    days: string | number
    hours: string | number
    minutes: string | number
    seconds: string | number
    milliseconds: string
    daysWord: string
    hoursWord: string
    minutesWord: string
    secondsWord: string
    millisecondsWord: string
  }
}

export interface VanillaTimerElements {
  days: string
  hours: string
  minutes: string
  seconds: string
  milliseconds: string
  wrapper: string
}

export interface VanillaTimerOptions extends TimerOptions {
  elements: VanillaTimerElements
}
