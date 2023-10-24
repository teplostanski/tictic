import { getFormattedTime } from '../getFormattedTime'

describe('getFormattedTime', () => {
  it('returns correctly formatted time by default', () => {
    const formattedTime = getFormattedTime({})
    expect(formattedTime).toMatch(/^\d{2}:\d{2}:\d{2}$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM:SS format', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm:ss' })
    expect(formattedTime).toMatch(/^\d{2}:\d{2}:\d{2}$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM:SS format with meridiem 24h', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm:ss', meridiem: { format: '24h' } })
    expect(formattedTime).toMatch(/^\d{2}:\d{2}:\d{2}$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM:SS format with meridiem 12h, position start, case capitalize', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm:ss', meridiem: { case: 'capitalize', position: 'start', format: '12h' } })
    expect(formattedTime).toMatch(/^(Am|Pm) \d{2}:\d{2}:\d{2}$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM:SS format with meridiem 12h, position start, case uppercase', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm:ss', meridiem: { case: 'uppercase', position: 'start', format: '12h' } })
    expect(formattedTime).toMatch(/^(AM|PM) \d{2}:\d{2}:\d{2}$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM:SS format with meridiem 12h, position start, case lowercase', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm:ss', meridiem: { case: 'lowercase', position: 'start', format: '12h' } })
    expect(formattedTime).toMatch(/^(am|pm) \d{2}:\d{2}:\d{2}$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM format with meridiem 12h, position end, case capitalize', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm', meridiem: { case: 'capitalize', position: 'end', format: '12h' } })
    expect(formattedTime).toMatch(/^\d{2}:\d{2} (Am|Pm)$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM format with meridiem 12h, position end, case uppercase', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm', meridiem: { case: 'uppercase', position: 'end', format: '12h' } })
    expect(formattedTime).toMatch(/^\d{2}:\d{2} (AM|PM)$/) // Time format check
  })

  it('returns correctly formatted time for HH:MM format with meridiem 12h, position end, case lowercase', () => {
    const formattedTime = getFormattedTime({ format: 'hh:mm', meridiem: { case: 'lowercase', position: 'end', format: '12h' } })
    expect(formattedTime).toMatch(/^\d{2}:\d{2} (am|pm)$/) // Time format check
  })

  it('returns correctly formatted time for MM:SS format', () => {
    const formattedTime = getFormattedTime({ format: 'mm:ss' })
    expect(formattedTime).toMatch(/^\d{2}:\d{2}$/) // Time format check
  })

  it('returns correctly formatted time for the given date', () => {
    const date = new Date('2023-10-14T15:30:45')
    const formattedTime = getFormattedTime({ time: date.getTime(), format: 'hh:mm:ss' })
    expect(formattedTime).toBe('15:30:45') // Check the formatted time
  })

  it('returns correctly formatted time for a string time argument', () => {
    const formattedTime = getFormattedTime({ time: '12:30', format: 'hh:mm' })
    expect(formattedTime).toBe('12:30') // Check the formatted time
  })

  it('returns correctly formatted time for a string time argument with seconds', () => {
    const formattedTime = getFormattedTime({ time: '12:30:45', format: 'hh:mm:ss' })
    expect(formattedTime).toBe('12:30:45') // Check the formatted time
  })

  it('throws an exception for an invalid separator', () => {
    expect(() => getFormattedTime({ sep: 'invalid_separator' })).toThrow('Separator must be a single character')
  })

  it('throws an exception for an invalid time format', () => {
    // @ts-ignore
    expect(() => getFormattedTime({ format: 'invalid_format' })).toThrow('Invalid time format')
  })

  it('throws an exception for an invalid time string format', () => {
    expect(() => getFormattedTime({ time: 'invalid_time_string' })).toThrow('Invalid time string format')
  })

  let warnSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any>

  // `beforeEach` is a lifecycle hook provided by many testing frameworks.
  // It's used to execute specific logic or set up conditions before the start of each individual test within its scope.
  // The primary purpose of `beforeEach` is to ensure that tests run under consistent conditions and to reduce code redundancy.
  // Common use cases include:
  // 1. Setting up mock functions or objects to isolate unit tests from external dependencies.
  // 2. Resetting global states to ensure tests do not have side effects on each other.
  // 3. Establishing conditions or configurations that multiple tests rely on.
  // This way, even if one test modifies an environment or a global state, it won't impact other tests, since `beforeEach` will reset or prepare the conditions again.
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  // `afterEach` is another lifecycle hook that runs after the completion of each individual test within its scope.
  // Its main role is cleanup and ensuring that the environment is returned to a neutral state, ready for subsequent tests.
  // Just like `beforeEach`, `afterEach` helps in maintaining test isolation and ensuring that tests do not have lingering side effects that could impact other tests.
  // Common use cases include:
  // 1. Restoring mocked functions or objects to their original states.
  // 2. Cleaning up resources such as database records, open files, or network connections created during tests.
  // 3. Clearing configurations or conditions set in the beforeEach hook.
  // By employing `afterEach`, you ensure that subsequent tests or test suites run in an environment that's free from side effects or residues of previous tests.
  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('should warn when 24h format is used with case or position', () => {
    getFormattedTime({
      time: new Date().getTime(),
      meridiem: {
        format: '24h',
        case: 'uppercase',
        position: 'end',
      },
    })

    expect(warnSpy).toHaveBeenCalledWith("When using the 24-hour format, 'position' and 'case' parameters are not necessary. They are only relevant for the 12-hour format.")
  })
})
