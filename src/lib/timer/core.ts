import { TimerOptions, TimerInstance, TimeUnit } from './types'

const localization = {
  ru: {
    days: ['день', 'дня', 'дней'],
    hours: ['час', 'часа', 'часов'],
    minutes: ['минута', 'минуты', 'минут'],
    seconds: ['секунда', 'секунды', 'секунд'],
    milliseconds: ['миллисекунд'],
  },
  en: {
    days: ['day', 'days'],
    hours: ['hour', 'hours'],
    minutes: ['minute', 'minutes'],
    seconds: ['second', 'seconds'],
    milliseconds: ['milliseconds'],
  },
}

export const coreTimer = (options: TimerOptions): TimerInstance => {
  const { days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, locale = 'en', showWords = false, sep = ' ', leadingZeros = false } = options

  const timeLeft: Record<TimeUnit, number> = {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  }

  let interval: ReturnType<typeof setInterval> | undefined

  const timeUnitsInOrder: (keyof TimerOptions)[] = ['days', 'hours', 'minutes', 'seconds', 'milliseconds']

  const definedUnits = timeUnitsInOrder.filter((unit) => options[unit] !== undefined)

  for (let i = 0; i < definedUnits.length - 1; i++) {
    const currentUnitIndex = timeUnitsInOrder.indexOf(definedUnits[i])
    const nextUnitIndex = timeUnitsInOrder.indexOf(definedUnits[i + 1])

    if (nextUnitIndex - currentUnitIndex !== 1) {
      throw new Error(
        `Missing parameter(s) between '${definedUnits[i]}' and '${
          definedUnits[i + 1]
        }' Make sure that the transmitted time units follow the order: days, hours, minutes, seconds. You can't miss what's in the middle. For example, days -> hours -> seconds without minutes are not allowed.`,
      )
    }
  }

  const formatNumberWithLeadingZeros = (value: number, digits: number): string => {
    let result = value.toString()
    while (result.length < digits) {
      result = '0' + result
    }
    return result
  }

  const getMaxWordLength = (words: string[]) => {
    return Math.max(...words.map((word) => word.length))
  }

  const padWord = (word: string, maxLength: number) => {
    while (word.length < maxLength) {
      word += '\u00A0'
    }
    return word
  }

  const getWordForm = (value: number, words: string[], maxLength: number) => {
    let chosenWord = ''

    if (words.length === 1) {
      return padWord(words[0], maxLength)
    }

    if (locale === 'ru') {
      const lastDigit = value % 10
      const lastTwoDigits = value % 100

      if (lastDigit === 1 && lastTwoDigits !== 11) chosenWord = words[0]
      else if (lastDigit >= 2 && lastDigit <= 4 && ![12, 13, 14].includes(lastTwoDigits)) chosenWord = words[1]
      else chosenWord = words[2]
    } else {
      chosenWord = value === 1 ? words[0] : words[1]
    }

    return padWord(chosenWord, maxLength)
  }

  const stop = () => {
    if (interval) clearInterval(interval)
    timeLeft.days = 0
    timeLeft.hours = 0
    timeLeft.minutes = 0
    timeLeft.seconds = 0
    timeLeft.milliseconds = 0
  }

  const update = () => {
    timeLeft.milliseconds -= 10

    if (timeLeft.milliseconds < 0) {
      timeLeft.milliseconds = 990
      timeLeft.seconds--

      if (timeLeft.seconds < 0) {
        timeLeft.seconds = 59
        timeLeft.minutes--

        if (timeLeft.minutes < 0) {
          timeLeft.minutes = 59
          timeLeft.hours--

          if (timeLeft.hours < 0) {
            timeLeft.hours = 23
            timeLeft.days--

            if (timeLeft.days < 0) {
              stop()
            }
          }
        }
      }
    }
  }

  const start = (callback?: () => void) => {
    interval = setInterval(() => {
      update()
      if (callback) callback()
    }, 10)
  }

  const getTime = () => {
    const formatNumberWithSpace = (value: number, digits: number): string => {
      let result = value.toString()
      while (result.length < digits) {
        result = '\u00A0' + result
      }
      return result
    }

    const maxDaysLength = getMaxWordLength(localization[locale].days)
    const maxHoursLength = getMaxWordLength(localization[locale].hours)
    const maxMinutesLength = getMaxWordLength(localization[locale].minutes)
    const maxSecondsLength = getMaxWordLength(localization[locale].seconds)

    return {
      days: leadingZeros ? formatNumberWithLeadingZeros(timeLeft.days, 2) : formatNumberWithSpace(timeLeft.days, 2),
      hours: leadingZeros ? formatNumberWithLeadingZeros(timeLeft.hours, 2) : formatNumberWithSpace(timeLeft.hours, 2),
      minutes: leadingZeros ? formatNumberWithLeadingZeros(timeLeft.minutes, 2) : formatNumberWithSpace(timeLeft.minutes, 2),
      seconds: leadingZeros ? formatNumberWithLeadingZeros(timeLeft.seconds, 2) : formatNumberWithSpace(timeLeft.seconds, 2),
      milliseconds: formatNumberWithLeadingZeros(timeLeft.milliseconds, 3),
      daysWord: showWords ? getWordForm(timeLeft.days, localization[locale].days, maxDaysLength) : '',
      hoursWord: showWords ? getWordForm(timeLeft.hours, localization[locale].hours, maxHoursLength) : '',
      minutesWord: showWords ? getWordForm(timeLeft.minutes, localization[locale].minutes, maxMinutesLength) : '',
      secondsWord: showWords ? getWordForm(timeLeft.seconds, localization[locale].seconds, maxSecondsLength) : '',
      millisecondsWord: showWords ? getWordForm(timeLeft.milliseconds, localization[locale].milliseconds, 0) : '',
    }
  }

  return {
    days: timeLeft.days,
    hours: timeLeft.hours,
    minutes: timeLeft.minutes,
    seconds: timeLeft.seconds,
    milliseconds: timeLeft.milliseconds,
    toString: () => {
      const { days, hours, minutes, seconds, milliseconds } = getTime()

      let result = ''

      if (showWords) {
        const maxDayWordLength = getMaxWordLength(localization[locale].days)
        const maxHourWordLength = getMaxWordLength(localization[locale].hours)
        const maxMinuteWordLength = getMaxWordLength(localization[locale].minutes)
        const maxSecondWordLength = getMaxWordLength(localization[locale].seconds)
        const maxMillisecondWordLength = getMaxWordLength(localization[locale].milliseconds)

        result += `${days} ${getWordForm(timeLeft.days, localization[locale].days, maxDayWordLength)}${sep}`
        result += `${hours} ${getWordForm(timeLeft.hours, localization[locale].hours, maxHourWordLength)}${sep}`
        result += `${minutes} ${getWordForm(timeLeft.minutes, localization[locale].minutes, maxMinuteWordLength)}${sep}`
        result += `${seconds} ${getWordForm(timeLeft.seconds, localization[locale].seconds, maxSecondWordLength)}${sep}`
        result += `${milliseconds} ${getWordForm(timeLeft.milliseconds, localization[locale].milliseconds, maxMillisecondWordLength)}`
      } else {
        result += `${days}:${hours}:${minutes}:${seconds}:${milliseconds}`
      }

      return result
    },
    start,
    stop,
    getTime,
  }
}
