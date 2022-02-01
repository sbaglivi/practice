const root = document.getElementById('root');
const OPENING_HOUR = 9; 
const BREAK_START =  13;
const BREAK_END = 14; 
const CLOSING_HOUR = 18;
const SESSIONS_PER_HOUR = 2;
const MINUTES_PER_HOUR = 60;
const createTableHead = (table)=>{
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.textContent = "Time"
    tr.append(th);
    thead.append(tr);
    table.append(thead);
}
const createTableBody = (tbody, OPENING_HOUR, BREAK_START, BREAK_END, CLOSING_HOUR, SESSIONS_PER_HOUR) => {
    createTableRowsForAvailableSessions(OPENING_HOUR, BREAK_START, SESSIONS_PER_HOUR, tbody);
    createTableRowsForAvailableSessions(BREAK_END, CLOSING_HOUR, SESSIONS_PER_HOUR, tbody);
}
const tableRowForHourAndSession = (hour, session) => {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.textContent = createHourAndSessionString(hour, session);
    tr.append(td);
    return tr
}
const createHourAndSessionString = (hour, session) => {
    let hourAndSession = `${hour.toString().padStart(2,'0')}:${(MINUTES_PER_HOUR/SESSIONS_PER_HOUR*session).toString().padStart(2,'0')}`
    hourAndSession += ' -  ';
    hourAndSession += session+1 >= SESSIONS_PER_HOUR ? `${(hour+1).toString().padStart(2,'0')}:00` : 
      `${hour.toString().padStart(2,'0')}:${(MINUTES_PER_HOUR/SESSIONS_PER_HOUR*(session+1)).toString().padStart(2,'0')}`
        // a+1 >= sessionsperhour ? if so increase i and set a to 0 : i stays the same and a increases by 1
        // parameters are being passed in a dogshit matter, not sure if I want to have some as global vars or if I want to pass them down the full chain
    return hourAndSession;
}
const createTableRowsForAvailableSessions = (start, end, sessionsPerHour, tbody) => {
    let tr;
   for(let i = start; i < end; i++){
        for (let a=0; a < sessionsPerHour; a++){
            tr = tableRowForHourAndSession(i, a);
            tbody.append(tr);
        }
   }
}
let table = document.createElement('table');
createTableHead(table);
tbody = document.createElement('tbody');
createTableBody(tbody, OPENING_HOUR, BREAK_START, BREAK_END, CLOSING_HOUR, SESSIONS_PER_HOUR);
table.append(tbody);
root.append(table);
let dummyData = {
    '13/02/22' : {'sessionDuration' : 30, 'appointmentsList' : [{'hour':'09:00:00', 'name' : 'Roger'}, {'hour':'11:00:00', 'name':'John'}]}
}
/* This makes it look like:
- When I change a day I query the db (or the api) for the appointments of the day
- When I create the table for that day for each slot I have to run a loop on the appointments which checks if the starting time of the slot I'm creating matches the time of an appointment;
if it does it gets greyed out and w/e. This seems bad because it's a loop in a loop and I end up checking the same appointments multiple times. If sql returns them ordered by something 
I can probably skip some redundant checks otherwise it's bad. The better way would have to create a list of slots to be made and then checking one time the appointments list and removing any
appointment from the 'list of slots to be made'

*/