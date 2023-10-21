[Modules](index.md) > getFormattedTime

# getFormattedTime()

**`Function`**

> **getFormattedTime**(options: [`ITimeOptions`](interface.ITimeOptions.md)): `string`

Returns a formatted time string based on the provided options.

[Options](interface.ITimeOptions.md)

## Example

```js
getFormattedTime({
  time: new Date().getTime(),
  sep: ':',
  format: 'hh:mm:ss 12h',
})
```

## Parameters

| Parameter | Type                                        | Description                             |
| :-------- | :------------------------------------------ | :-------------------------------------- |
| options   | [`ITimeOptions`](interface.ITimeOptions.md) | Configuration options for the function. |

## Returns

`string`

Formatted time string.
