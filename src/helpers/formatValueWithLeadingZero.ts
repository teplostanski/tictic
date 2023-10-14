/**
 * Function to format a number or string with a leading zero added.
 *
 * @param value - Number or string to format.
 * @param addLeadingZero - Flag indicating whether to add a leading zero.
 * @returns The formatted value.
 */
export function formatValueWithLeadingZero(value: string | number, addLeadingZero = true) {
  const stringValue = value.toString()

  if (addLeadingZero) {
    return stringValue.padStart(2, '0')
  }

  return stringValue
}
