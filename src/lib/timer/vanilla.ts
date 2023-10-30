import { coreTimer } from './core'
import { TimeUnit, TimerOptions, VanillaTimerElements, VanillaTimerOptions } from './types'

export const vanillaTimer = (options: VanillaTimerOptions) => {
  const { elements, ...timerOptions } = options
  const timer = coreTimer(timerOptions)

  const updateDisplay = () => {
    const currentTime = timer.getTime()
    for (const key in elements) {
      if (key !== 'wrapper' && options[key as keyof TimerOptions] !== undefined) {
        const elementId = elements[key as keyof VanillaTimerElements]
        const element = document.getElementById(elementId)
        if (element) {
          element.textContent = String(currentTime[key as keyof typeof currentTime])
          if (options.showWords) {
            const wordKey = (key + 'Word') as keyof typeof currentTime
            element.textContent += ' ' + currentTime[wordKey]
          }
        }
      }
    }
  }

  const setTimer = (time: Record<TimeUnit, number>) => {
    timer.setTime(time)
  }

  return {
    start: () => {
      timer.start(updateDisplay)
    },
    stop: () => {
      timer.stop()
      updateDisplay()
    },
    pause: () => {
      timer.pause()
    },
    updateDisplay,
    setTimer,
    resume: () => {
      timer.resume(updateDisplay)
    },
  }
}