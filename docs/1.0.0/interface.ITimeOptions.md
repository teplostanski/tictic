[Modules](index.md) > ITimeOptions

# ITimeOptions

**`Interface`**

Options for time formatting.

## Remarks

`?` - means an `optional` parameter

## Properties

### format

> **format**?: "hh:mm:ss" \| "hh:mm" \| "mm:ss"

#### Param

Format in which the time should be returned.
Possible formats include `hh:mm:ss`, `hh:mm`, etc.

#### Default

```ts
'hh:mm:ss'
```

### meridiem

> **meridiem**?: `object`

#### Param

The object of the AM/PM parameters

#### Type declaration (meridiem)

| Member    | Type                                       | Description                                                                                      |
| :-------- | :----------------------------------------- | :----------------------------------------------------------------------------------------------- |
| case?     | [`TLetterCase`](type-alias.TLetterCase.md) | `Param`<br /><br />Changes the case of AM/PM (capitalize, uppercase, lowercase)                  |
| format    | "12h" \| "24h"                             | `Param`<br /><br />Choose between '12h' or '24h' format.<br /><br />`Default`<br /><br />`'24h'` |
| position? | `TPosition`                                | `Param`<br /><br />Sets the position of AM/PM (start or end)                                     |

### sep

> **sep**?: `string`

#### Param

Separator character to use between time units.

#### Default

```ts
':'
```

### time

> **time**?: `number` \| [`TDate`](type-alias.TDate.md)

#### Param

Time in milliseconds since the Unix Epoch. Defaults to the current time.

#### Default

```ts
new Date().getTime()
```
