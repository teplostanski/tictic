import { getFormattedDate } from '../getFormattedDate'

describe('getFormattedDate', () => {
  const currentDate = new Date()
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const decomposeDate = (date: Date): [string, string, string] => {
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return [year, month, day]
  }
  const [year, month, day] = decomposeDate(currentDate)

  it('should return default formatted date for today', () => {
    expect(getFormattedDate({})).toBe(`${year}.${month}.${day}`)
  })

  it('should use custom separator', () => {
    expect(getFormattedDate({ sep: '-' }).split('-').length).toBe(3)
  })

  it('should format in DD-MM-YYYY style', () => {
    expect(getFormattedDate({ format: 'DD-MM-YYYY', sep: '.' })).toBe(`${day}.${month}.${year}`)
  })

  it('should format in YYYY-MM-DD style', () => {
    expect(getFormattedDate({ format: 'YYYY-MM-DD' })).toBe(`${year}.${month}.${day}`)
  })

  it('should exclude day and month from result', () => {
    expect(getFormattedDate({ exclude: { day: true, month: true } })).toBe(year)
  })

  it('should use month names instead of numbers', () => {
    const result = getFormattedDate({ nameOfMonths: monthNames })
    expect(result.split('.')[1]).toBe(monthNames[currentDate.getMonth()])
  })

  it('should prepend day of the week in short format', () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const result = getFormattedDate({
      weekDays: {
        set: true,
        format: 'short',
        locale: 'en',
        case: 'capitalize',
        position: 'start',
      },
    })
    expect(result.startsWith(days[currentDate.getDay() - 1])).toBeTruthy()
  })

  it('should increment day by 1', () => {
    const date = new Date(new Date().setDate(new Date().getDate() + 1))
    const [year, month, day] = decomposeDate(date)
    expect(getFormattedDate({ incDay: 1 })).toBe(`${year}.${month}.${day}`)
  })

  it('should decrement day by 1', () => {
    const date = new Date(new Date().setDate(new Date().getDate() - 1))
    const [year, month, day] = decomposeDate(date)
    expect(getFormattedDate({ decDay: 1 })).toBe(`${year}.${month}.${day}`)
  })
})
