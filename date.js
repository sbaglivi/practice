let root = document.getElementById('root');
const getDaysInMonth = (monthIndex, year) => {
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
const testDaysInMonth = () => {
    for (let i = 1; i <= 12; i++) {
        console.log(`${i} : ${getDaysInMonth(i, 2022)}`)
    }
}
const getStartingDayOfMonth = (month, year) => {
    let firstDay = new Date(year, month - 1, 1);
    let weekdayIndex = firstDay.getDay(); // Sunday = 0, I want Monday = 0
    weekdayIndex = weekdayIndex !== 0 ? weekdayIndex - 1 : 6;
    return weekdayIndex;
}
const testStartingDay = () => {
    for (let i = 1; i <= 12; i++) {
        console.log(`${i}/22 first day was: ${getStartingDayOfMonth(i, 2022)}`)
    }
}
const createMonthHead = () => {
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
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;
const monthNames = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const createYearButtons = () => {
    let tr, th;
    tr = document.createElement('tr');
    let previousButton = document.createElement('button');
    previousButton.textContent = '<';
    previousButton.addEventListener('click', (e) => {
        currentYear--;
        renderTable();
    })
    tr.append(previousButton);
    th = document.createElement('th');
    th.textContent = currentYear;
    tr.append(th);
    let nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.addEventListener('click', (e) => {
        currentYear++;
        renderTable();
    })
    tr.append(nextButton);
    return tr;
}
const increaseMonth = () => {
    if (currentMonth === 12) {
        currentMonth = 1;
        currentYear++;
        return;
    }
    currentMonth++;
}
const decreaseMonth = () => {
    if (currentMonth === 1) {
        currentMonth = 12;
        currentYear--;
        return
    }
    currentMonth--;
}
const createMonthButtons = () => {
    let tr, th;
    let previousButton = document.createElement('button');
    tr = document.createElement('tr');
    previousButton.textContent = '<';
    previousButton.addEventListener('click', (e) => {
        decreaseMonth();
        renderTable();
    })
    tr.append(previousButton);
    th = document.createElement('th');
    th.textContent = monthNames[previousMonthIndex(currentMonth)];
    tr.append(th);
    th = document.createElement('th');
    th.textContent = monthNames[currentMonth];
    tr.append(th);
    th = document.createElement('th');
    th.textContent = monthNames[nextMonthIndex(currentMonth)];
    tr.append(th);
    let nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.addEventListener('click', (e) => {
        increaseMonth();
        renderTable();
    })
    tr.append(nextButton);
    return tr;
}
const previousMonthIndex = (curMonth) => curMonth === 1 ? 12 : curMonth - 1;
const nextMonthIndex = curMonth => curMonth === 12 ? 1 : curMonth + 1;
function printDateString() {
    console.log(`${this.textContent.padStart(2, '0')}-${currentMonth.toString().padStart(2, '0')}-${currentYear}`);
}
// console.log(`${this.textContent.padStart(2, '0')}-${currentMonth.toString().padStart(2, '0')}-${currentYear}`).bind(this);
const createMonthDays = () => {
    let monthLength = getDaysInMonth(currentMonth, currentYear);
    let firstOfMonth = getStartingDayOfMonth(currentMonth, currentYear);
    let totalDrawn = 0;
    let tr, td;
    let tbody = document.createElement('tbody');
    console.log(totalDrawn, monthLength, firstOfMonth);
    while (totalDrawn < monthLength + firstOfMonth) {
        tr = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            td = document.createElement('td');
            td.textContent = (totalDrawn >= firstOfMonth && totalDrawn - firstOfMonth < monthLength) ? totalDrawn - firstOfMonth + 1 : '/';
            td.addEventListener('click', printDateString.bind(td))
            tr.append(td);
            totalDrawn++;
        }
        tbody.append(tr);
    }
    return tbody;
    // create td and raise totaldrawn; if totaldrawn >= firstofmonth you start using numbers instead of /. if totaldrawn >= daysinmonth + firstofmonth stop weeks
}
let table = document.createElement('table');
const renderTable = () => {
    table.innerHTML = '';
    table.append(createYearButtons());
    table.append(createMonthButtons());
    // table.append body
    table.append(createMonthHead());
    table.append(createMonthDays());
}
renderTable();
root.append(table);