import { getFormattedTime } from '../getFormattedTime' // Подставьте правильный путь

describe('getFormattedTime', () => {
  it('returns correctly formatted time by default', () => {
    const formattedTime = getFormattedTime({})
    expect(formattedTime).toMatch(/^\d{2}:\d{2}:\d{2}$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM:SS format', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm:ss' })
    expect(formattedTime).toMatch(/^\d{2}:\d{2}:\d{2}$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM:SS 12h format', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm:ss 12h' })
    expect(formattedTime).toMatch(/^\d{2}:\d{2}:\d{2} (AM|PM)$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM 12h format', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm 12h' })
    expect(formattedTime).toMatch(/^\d{2}:\d{2} (AM|PM)$/) // Time format check
  })

  it('returns correctly formatted time for the given date', () => {
    const date = new Date('2023-10-14T15:30:45')
    const formattedTime = getFormattedTime({ time: date.getTime(), format: 'hh:mm:ss' })
    expect(formattedTime).toBe('15:30:45') // Check the formatted time
  })

  it('throws an exception for an invalid time format', () => {
    // @ts-ignore
    expect(() => getFormattedTime({ format: 'invalid_format' })).toThrow('Invalid time format')
  })

  it('throws an exception for an invalid separator', () => {
    expect(() => getFormattedTime({ sep: 'invalid_separator' })).toThrow('Separator must be a single character')
  })

  it('returns correctly formatted time for MM:SS format', () => {
    const formattedTime = getFormattedTime({ format: 'mm:ss' })
    expect(formattedTime).toMatch(/^\d{2}:\d{2}$/) // Time format check
  })

  it('returns correctly formatted time for MM:SS 12h format', () => {
    const formattedTime = getFormattedTime({ format: 'mm:ss 12h' })
    expect(formattedTime).toMatch(/^\d{2}:\d{2} (AM|PM)$/) // Time format check
  })

  it('returns correctly formatted time for a string time argument', () => {
    const formattedTime = getFormattedTime({ time: '12:30', format: 'hh:mm' })
    expect(formattedTime).toBe('12:30') // Check the formatted time
  })

  it('returns correctly formatted time for a string time argument with seconds', () => {
    const formattedTime = getFormattedTime({ time: '12:30:45', format: 'hh:mm:ss' })
    expect(formattedTime).toBe('12:30:45') // Check the formatted time
  })

  it('throws an exception for an invalid time string format', () => {
    expect(() => getFormattedTime({ time: 'invalid_time_string' })).toThrow('Invalid time string format')
  })
})
