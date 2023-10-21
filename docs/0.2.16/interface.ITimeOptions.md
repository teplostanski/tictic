[Modules](index.md) > ITimeOptions

# ITimeOptions

**`Interface`**

Options for time formatting.

## Remarks

`?` - means an `optional` parameter

## Properties

### format

> **format**?: "hh:mm:ss" \| "hh:mm:ss 12h" \| "hh:mm" \| "hh:mm 12h" \| "mm:ss" \| "mm:ss 12h"

#### Param

Format in which the time should be returned.
Possible formats include `hh:mm:ss`, `hh:mm`, etc. Can also include `12h` for 12-hour time format.

#### Default

```ts
'hh:mm:ss'
```

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
