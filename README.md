# tictic

A versatile and efficient JavaScript library for formatting date and time.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Date Formatting](#date-formatting)
   - [Time Formatting](#time-formatting)
4. [API Reference](#api-reference)
5. [License](#license)

## Features

- **Date Formatting**: Customize the output format for dates.
- **Name of Months**: Input custom names for months.
- **Day Increment/Decrement**: Modify the date by incrementing or decrementing days.
- **Weekday Formatting**: Control how weekdays are displayed with localization and other options.
- **Time Formatting**: Format time with support for 12-hour or 24-hour formats.
- **Valid Time Formats**: Use predefined valid time formats for ease of use.

## Installation

Install `tictic` via npm:

```bash
npm install tictic --save
```

# [Docs 0.2.16](https://github.com/teplostanski/tictic/tree/main/docs/0.2.16/index.md)

## Usage
#### Date Formatting

Here's how you can use tictic to format dates:

```javascript

import { getFormattedDate } from 'tictic'

const formattedDate = getFormattedDate({
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
    position: 'end'
  },
  incDay: 1
});

console.log(formattedDate);  // Outputs something like: "15-JAN-2023 SUN"
```

#### Time Formatting

Formatting time is straightforward as well:

```javascript
import { getFormattedTime } from 'tictic'

const formattedTime = getFormattedTime({
  time: new Date().getTime(),
  sep: ':',
  format: 'hh:mm:ss 12h'
});

console.log(formattedTime);  // Outputs something like: "01:45:20 PM"
```

API Reference

For a deep dive into each method and its options, please refer to the source code documentation. It provides clear details about each configuration property and its possible values.

## License
This project is licensed under the GNU General Public License v3.0 (GPL-3.0). See [LICENSE.md](https://github.com/teplostanski/tictic/blob/main/LICENSE.md) for more details.