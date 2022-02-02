class Calendar {
    static monthNames = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    static weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    constructor(parentObject) {
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth() + 1;
        this.table = document.createElement('table');
        this.renderTable();
        parentObject.append(this.table);
    }
    renderTable() {
        this.table.innerHTML = '';
        this.renderYearButtons();
        this.renderMonthButtons();
        this.renderMonthHead();
        this.renderMonthDays();

    }
    getMonthLength(monthIndex, year) {
        switch (monthIndex) {
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                return (year % 4 ? 28 : 29);
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            default:
                console.log(`Received a broken month index: ${monthIndex}`);
                return;
        }
    }
    getStartingDayOfCurrentMonth() {
        let firstDay = new Date(this.currentYear, this.currentMonth - 1, 1);
        let weekdayIndex = firstDay.getDay(); // Sunday = 0, I want Monday = 0
        weekdayIndex = weekdayIndex !== 0 ? weekdayIndex - 1 : 6;
        return weekdayIndex;
    }
    createMonthHead() {
        let tr = document.createElement('tr');
        let th;
        const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        for (let weekday of weekdays) {
            th = document.createElement('th');
            th.textContent = weekday;
            tr.append(th);
        }
        return tr;
    }
    renderMonthHead() {
        this.table.append(this.createMonthHead());
    }
    createYearButtons() {
        let tr, th;
        tr = document.createElement('tr');
        let previousButton = document.createElement('button');
        previousButton.textContent = '<';
        previousButton.addEventListener('click', (e) => {
            this.currentYear--;
            renderTable();
        })
        tr.append(previousButton);
        th = document.createElement('th');
        th.textContent = this.currentYear;
        th.setAttribute('colSpan','5')
        tr.append(th);
        let nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.addEventListener('click', (e) => {
            this.currentYear++;
            renderTable();
        })
        tr.append(nextButton);
        return tr;
    }
    renderYearButtons() {
        this.table.append(this.createYearButtons());
    }
    increaseMonth(){
        if (this.currentMonth === 12) {
            this.currentMonth = 1;
            this.currentYear++;
            return;
        }
        this.currentMonth++;
    }
    decreaseMonth = () => {
        if (this.currentMonth === 1) {
            this.currentMonth = 12;
            this.currentYear--;
            return
        }
        this.currentMonth--;
    }
    createMonthButtons = () => {
        let tr, th;
        let previousButton = document.createElement('button');
        tr = document.createElement('tr');
        th = document.createElement('th');
        previousButton.textContent = '<';
        previousButton.addEventListener('click', (e) => {
            this.decreaseMonth();
            this.renderTable();
        })
        th.setAttribute('colSpan','2');
        th.append(previousButton)
        tr.append(th);
        th = document.createElement('th');
        th.textContent = Calendar.monthNames[this.previousMonthIndex(this.currentMonth)];
        th.style.color = 'gray';
        tr.append(th);
        th = document.createElement('th');
        th.textContent = Calendar.monthNames[this.currentMonth];
        tr.append(th);
        th = document.createElement('th');
        th.textContent = Calendar.monthNames[this.nextMonthIndex(this.currentMonth)];
        th.style.color = 'gray';
        tr.append(th);
        tr.append(th);
        th = document.createElement('th');
        let nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.addEventListener('click', (e) => {
            this.increaseMonth();
            this.renderTable();
        })
        th.setAttribute('colSpan','2');
        th.append(nextButton);
        tr.append(th);
        return tr;
    }
    renderMonthButtons(){
        this.table.append(this.createMonthButtons());
    }
    previousMonthIndex = (curMonth) => curMonth === 1 ? 12 : curMonth - 1;
    nextMonthIndex = curMonth => curMonth === 12 ? 1 : curMonth + 1;
printDateString(day, month, year) {
    console.log(`${day.padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`);
}
nextMonthAndYearIndexes = (month, year)=>{
    let nextYear = month === 12 ? year + 1 : year;
    let nextMonth = this.nextMonthIndex(month);
    return [nextMonth, nextYear];
}
previousMonthAndYearIndexes = (month, year) => {
    let previousYear = month === 1 ? year - 1 : year;
    let previousMonth = this.previousMonthIndex(month);
    return [previousMonth, previousYear]
}
createMonthDays = () => {
    let monthLength = this.getMonthLength(this.currentMonth, this.currentYear);
    let previousMonthLength = this.getMonthLength(this.previousMonthIndex(this.currentMonth), this.currentYear)
    let firstOfMonth = this.getStartingDayOfCurrentMonth();
    let totalDrawn = 0;
    let tr, td;
    let tbody = document.createElement('tbody');
    console.log(totalDrawn, monthLength, firstOfMonth);
    while (totalDrawn < monthLength + firstOfMonth) {
        tr = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            td = document.createElement('td');
            // td.textContent = (totalDrawn >= firstOfMonth && totalDrawn - firstOfMonth < monthLength) ? totalDrawn - firstOfMonth + 1 : '/';
            if (totalDrawn >= firstOfMonth && totalDrawn - firstOfMonth < monthLength) {
             td.textContent = totalDrawn - firstOfMonth + 1;
            td.addEventListener('click', this.printDateString.bind(null,td.textContent, this.currentMonth, this.currentYear))
            } else if (totalDrawn < firstOfMonth) {
                td.textContent = previousMonthLength + totalDrawn - firstOfMonth + 1; 
                td.style.color = 'gray'
                td.addEventListener('click', this.printDateString.bind(null,td.textContent, ...this.previousMonthAndYearIndexes(this.currentMonth, this.currentYear)))
            } else {
                td.textContent = totalDrawn - firstOfMonth - monthLength + 1;
                td.style.color = 'gray'
                td.addEventListener('click', this.printDateString.bind(null,td.textContent, ...this.nextMonthAndYearIndexes(this.currentMonth, this.currentYear)))
            }
            tr.append(td);
            totalDrawn++;
        }
        tbody.append(tr);
    }
    return tbody;
    // create td and raise totaldrawn; if totaldrawn >= firstofmonth you start using numbers instead of /. if totaldrawn >= daysinmonth + firstofmonth stop weeks
}
renderMonthDays(){
    this.table.append(this.createMonthDays());
}
}
let calendar = new Calendar(document.getElementById('root'));