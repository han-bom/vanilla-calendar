class Calendar {
    constructor(parent, options) {
        if (parent != null) {
            if (typeof parent != 'object' || !(parent instanceof Element)) {
                throw Error('parameter is not DOMElement');
            }
        } else {
            throw Error('parameter is NULL');
        }

        if (options != null) {
            if (typeof options != 'object') {
                throw Error('options is not Object');
            }

            if (options.today && options.today instanceof Date != true) {
                throw Error('options.today is not Date');
            }
        }

        this.options = Object.assign({
            dayNames: {
                abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                standAlone: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
            },
            dayNameType: 'short',
            format: 'YYYY-MM',
            showPrevMonthDate: false,
            showNextMonthDate: false,
            today: undefined, // default is new Date
            year: undefined, // default is today.getFullYear()
            month: undefined, // default is today.getMonth()
        }, options);

        this.today = this.options.today ?? new Date();
        this.year = this.options.year ?? this.today.getFullYear();
        this.month = this.options.month ?? this.today.getMonth();

        this.createRootElement(parent);
        this.createCalendar(this.year, this.month);
        
        this.parent = parent;
        this.element = null;
    }

    createRootElement(parent) {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');


        let titleWrap = document.createElement('tr');
        let dayNames = document.createElement('tr');

        let title = document.createElement('th');

        title.colSpan = 7;
        title.innerHTML = this.format(this.year, this.month);

        titleWrap.appendChild(title);

        for (let i = 0; i < 7; i++) {
            let th = document.createElement('th');

            th.innerHTML = this.options.dayNames[this.options.dayNameType][i];

            dayNames.appendChild(th);
        }

        thead.appendChild(titleWrap);
        thead.appendChild(dayNames);
        table.appendChild(thead);
        table.appendChild(tbody);
        parent.appendChild(table);

        this.title = title;
        this.table = table;
        this.thead = thead;
        this.tbody = tbody;
    }

    createCalendar(year, month) {
        let first = new Date(year, month, 1);
        let last = new Date(year, month + 1, 0);
        let totalWeek = Math.ceil((first.getDay() + last.getDate()) / 7);
        let prevMonthLast = undefined;
        let nextMonthFirst = undefined;

        if (this.options.showPrevMonthDate) {
            prevMonthLast = new Date(year, month, 0);
        }

        if (this.options.showNextMonthDate) {
            nextMonthFirst = new Date(year, month + 1, 1);
        }

        for (let y = 0; y < totalWeek; y++) {
            let tr = document.createElement('tr');

            for (let x = 0; x < 7; x++) {
                let td = document.createElement('td');
                let date = y * 7 + x - first.getDay() + 1;

                if (date > 0 && date <= last.getDate()) {
                    if (year == this.today.getFullYear() && month == this.today.getMonth() && date == this.today.getDate()) {
                        td.classList.add('today');
                    } else if (date == first.getDate()) {
                        td.classList.add('firstday');
                    } else if (date == last.getDate()) {
                        td.classList.add('lastday')
                    }

                    td.classList.add('currentMonth');

                    td.append(date)
                } else if (date < 1) {
                    td.classList.add('prevMonth');

                    if (prevMonthLast) {
                        td.append(prevMonthLast.getDate() + date);
                    }
                } else if (date > last.getDate()) {
                    td.classList.add('nextMonth');

                    if (nextMonthFirst) {
                        td.append(date - last.getDate());
                    }
                }

                tr.appendChild(td);
            }

            this.tbody.appendChild(tr);
        }
    }

    recreateCalendar(year, month) {
        this.tbody.innerHTML = null;
        this.createCalendar(year, month);
    }

    setYearMonth(year, month) {
        this.year = year;
        this.month = month;

        this.summary.innerHTML = this.format(year, month);

        this.recreateCalendar(year, month);
    }

    setMonth(month) {
        this.setYearMonth(this.year, month);
    }

    setYear(year) {
        this.setYearMonth(year, this.month);
    }

    setNextMonth() {
        if (++this.month > 11) {
            this.month = 0;
            this.year++;
        }
        
        this.setYearMonth(this.year, this.month);
    }

    setPrevMonth() {
        if (--this.month < 0) {
            this.month = 11;
            this.year--;
        }

        this.setYearMonth(this.year, this.month);
    }

    format(year, month) {
        return this.options.format
            .replace(/yyyy/gi, year)
            .replace(/yy/gi, year.toString().slice(2))
            .replace(/mm/gi, month < 10 ? '0'+month : month)
            .replace(/m/gi, month);
    }
}