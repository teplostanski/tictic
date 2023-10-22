[Modules](index.md) > getFormattedDate

# getFormattedDate()

**`Function`**

> **getFormattedDate**(options: [`IDateOptions`](interface.IDateOptions.md)): `string`

The function returns a string with a formatted date

[Options](interface.IDateOptions.md)

## Example

```js
getFormattedDate({
  date: new Date(),
  sep: '-',
  format: 'DD-MM-YYYY',
  exclude: { year: false, month: false, day: false, zero: false },
  nameOfMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  weekDays: {
    set: true,
    locale: 'en',
    format: 'short',
    case: 'uppercase',
    position: 'end',
  },
  incDay: 1,
})
```

## Parameters

| Parameter | Type                                        | Description          |
| :-------- | :------------------------------------------ | :------------------- |
| options   | [`IDateOptions`](interface.IDateOptions.md) | Configuration Object |

## Returns

`string`

A string with a formatted date
