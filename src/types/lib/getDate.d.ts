import { TGetDate } from '../types'
/**
 * The function returns a string with a formatted date
 *
 * @param config Configuration Object
 * @param config.date Accepts the same input as the native `new Date()'. See: @link https://www.w3schools.com/js/js_date_formats.asp
 * @param config.sep Accepts a delimited string as input @default '.'
 * @param config.format Date output format
 * @param config.exclude Exception Object
 * @param config.exclude.year Excludes year
 * @param config.exclude.month Excludes month
 * @param config.exclude.day Excludes day
 * @param config.exclude.zero Excludes 0 at the beginning of the month or day if the number is less than 10
 * @param config.nameOfMonths Array with month names - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
 * @param config.weekDays The object of the days of the week parameters
 * @param config.weekDays.set Responsible for displaying the day of the week - by default `false`
 * @param config.weekDays.locale Localization of the days of the week, accepts the same input as the native method `Date.toLocaleString': 'ru' | 'en', etc
 * @param config.weekDays.format The output format of the days of the week, accepts the same input as the native method `Date.toLocaleString`: 'long' | 'short' | 'narrow'
 * @param config.weekDays.case Letter case: 'capitalize' | 'uppercase' | 'lowercase'
 * @param config.weekDays.position Position of the day of the week relative to the date: 'start' | 'end'
 * @param config.incDay Increases by 'n' days
 * @param config.decDay Decrease by 'n' days
 * @returns A string with a formatted date
 */
export declare const getDate: (config: TGetDate) => string
