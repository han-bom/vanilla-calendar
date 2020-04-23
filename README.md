# vanilla-calendar
calendar library on vanillia js

# Example
```
let options = {
  year: 2020,
  month: 4
};
let calendar = new Calendar(document.getByElementId('wrap'), options);
```

# Syntax
```new Calendar(parent[, options])```

## Parameters
**```parent```**  
A string that specifies the parent of element to be created

**```options```**  
An object containing any custom settings that you want to apply to the calendar. The possible options are [Options List](#options)


# Options
| name              | required | type    | default                                                                                                                                                                                                                                                                                                                                     | description |
|-------------------|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| dayNames          | false    | Object  | {<br>    abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],                <br>    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],                <br>    wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],                <br>    standAlone: ['S', 'M', 'T', 'W', 'T', 'F', 'S']<br>} |             |
| dayNameType       | false    | String  | 'short'                                                                                                                                                                                                                                                                                                                                     |             |
| format            | false    | String  | 'YYYY-MM'                                                                                                                                                                                                                                                                                                                                   |             |
| showPrevMonthDate | false    | Boolean | false                                                                                                                                                                                                                                                                                                                                       |             |
| showNextMonthDate | false    | Boolean | false                                                                                                                                                                                                                                                                                                                                       |             |
| today             | false    | Date    | new Date()                                                                                                                                                                                                                                                                                                                                  |             |
| year              | false    | Number  | today.getFullYear()                                                                                                                                                                                                                                                                                                                         |             |
| month             | false    | Number  | today.getMonth()                                                                                                                                                                                                                                                                                                                            |             |
