[Modules](index.md) > IDateOptions

# IDateOptions

**`Interface`**

Options for date formatting.

## Remarks

`?` - means an `optional` parameter

## Properties

### date

> **date**?: [`TDate`](type-alias.TDate.md)

#### Param

Accepts the same input as the native `new Date()`.

#### See

[https://www.w3schools.com/js/js_date_formats.asp](https://www.w3schools.com/js/js_date_formats.asp)

#### Default

```ts
new Date()
```

### decDay

> **decDay**?: `number`

#### Param

Decrease by `n` days

### exclude

> **exclude**?: `object`

#### Param

Exception Object

#### Default

```ts
{ year: false, month: false, day: false, zero: false }
```

#### Type declaration (exclude)

| Member | Type      | Description                                                                                      |
| :----- | :-------- | :----------------------------------------------------------------------------------------------- |
| day?   | `boolean` | `Param`<br /><br />Excludes day                                                                  |
| month? | `boolean` | `Param`<br /><br />Excludes month                                                                |
| year?  | `boolean` | `Param`<br /><br />Excludes year                                                                 |
| zero?  | `boolean` | `Param`<br /><br />Excludes 0 at the beginning of the month or day if the number is less than 10 |

### format

> **format**?: "YYYY-MM-DD" \| "YYYY-DD-MM" \| "MM-DD-YYYY" \| "DD-MM-YYYY" \| "YY-MM-DD" \| "YY-DD-MM" \| "MM-DD-YY" \| "DD-MM-YY"

#### Param

Date output format

#### Default

```ts
'YYYY-MM-DD'
```

### incDay

> **incDay**?: `number`

#### Param

Increases by `n` days

### nameOfMonths

> **nameOfMonths**?: `null` \| `string`[]

#### Param

Array with month names - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

#### Default

```ts
null
```

### sep

> **sep**?: `string`

#### Param

Separator character to use between time units.

#### Default

```ts
'.'
```

### weekDays

> **weekDays**?: `object`

#### Param

The object of the days of the week parameters

#### Default

```ts
{
      set: false,
      locale: 'en',
      format: 'long',
      case: 'capitalize',
      position: 'start',
    }
```

#### Type declaration (weekDays)

| Member   | Type                                         | Description                                                                                                                                                                                             |
| :------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| case     | [`TLetterCase`](type-alias.TLetterCase.md)   | `Param`<br /><br />Letter case: 'capitalize' \| 'uppercase' \| 'lowercase'<br /><br />`Default`<br /><br />`'capitalize'`                                                                               |
| format   | `undefined` \| "long" \| "short" \| "narrow" | `Param`<br /><br />The output format of the days of the week, accepts the same input as the native method `Date.toLocaleString`: 'long' \| 'short' \| 'narrow'<br /><br />`Default`<br /><br />`'long'` |
| locale   | `string`                                     | `Param`<br /><br />Localization of the days of the week, accepts the same input as the native method `Date.toLocaleString': 'ru' \| 'en'`, etc.<br /><br />`Default`<br /><br />`'en'`                  |
| position | `TPosition`                                  | `Param`<br /><br />Position of the day of the week relative to the date: 'start' \| 'end'<br /><br />`Default`<br /><br />`'start'`                                                                     |
| set      | `boolean`                                    | `Param`<br /><br />Responsible for displaying the day of the week<br /><br />`Default`<br /><br />`'false'`                                                                                             |
