import { getFormattedDate } from './lib/getFormattedDate'
import { getFormattedTime } from './lib/getFormattedTime'
//import { TDate, TGetDate, TLetterCase } from './types'

export { getFormattedDate, getFormattedTime }
//export type { TDate, TGetDate, TLetterCase }

/**
 * {@link X параметры}
 * {@inheritDoc X}
 */
export function add(
  /**
 * Функция, которая складывает два числа.

 * 
   * 
   * @description efwe
   * @yields X
   * @see https://example.com
   * @deprecated bfgsgsfg
   * @todo dfdsfsdfs
   * @returns {number} !!!!!!!!!!!!.
  
   */
  { a = 7, b = 9 }: X,
): number {
  return a + b
}

export interface X {
  /**
   *  @example
   * ```ts
   * add({})
   * ```
   * @argument a ddd
   * @param {number} a - Первое число.
   */
  a?: number
  /**
   * @param {number} b - Второе число. @type ррроро
   */
  b: number
  /**
   * @returns {number} Сумма двух чисел.
   * */
}
