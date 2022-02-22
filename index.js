/* Your Code Here */
// Your code here
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords (arrayArray) {
    const objectArray = [];
    arrayArray.forEach((array, idx) => objectArray[idx] = createEmployeeRecord(array));
    return objectArray;
}

function createTimeInEvent(dateStamp) {
    const timeIn = {};
    timeIn.type = "TimeIn";
    timeIn.hour = parseInt(dateStamp.substring(11,15), 10);
    timeIn.date = dateStamp.substring(0,10);
    this.timeInEvents.push(timeIn)
    return this;
}

function createTimeOutEvent(dateStamp) {
    const timeOut = {};
    timeOut.type = "TimeOut";
    timeOut.hour = parseInt(dateStamp.substring(11,15), 10);
    timeOut.date = dateStamp.substring(0,10);
    this.timeOutEvents.push(timeOut)
    return this;
}

function hoursWorkedOnDate(date) {
    const idx = this.timeInEvents.findIndex(obj => obj.date === date);
    if (idx === -1) {
        return 0;
    } else {
        return (this.timeOutEvents[idx].hour - this.timeInEvents[idx].hour)/100;
    }
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this,date) * this.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(el => el.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((prev, curr) => allWagesFor.call(curr) + prev, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

