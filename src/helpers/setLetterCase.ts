import { TLetterCase } from '../types'

/**
 * The function sets the latter case
 *
 * @param string String to be converted
 * @param value Letter case value
 * @returns A string with the specified letter case
 */

export const setLetterCase = (string: string, value: TLetterCase) => {
  if (value === 'capitalize') {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  if (value === 'lowercase') {
    return string.toLowerCase()
  }
  if (value === 'uppercase') {
    return string.toUpperCase()
  } else {
    return string
  }
}
