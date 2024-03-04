/*// Create a new Date object
var currentDate = new Date();

// Get the current date and time
var currentDateTime = currentDate.toISOString(); // This will give you the date and time in ISO 8601 format (e.g., "2024-03-03T15:30:00.000Z")

// Alternatively, you can format the date and time as you desire
var formattedDateTime = currentDate.toLocaleString(); // This will give you a formatted string representing the date and time according to the user's locale

console.log(formattedDateTime);

var currentDate = new Date();
var currentDateTime = currentDate.toISOString();
var formattedDateTime = currentDate.toLocaleString(); */


expenseArray = [{expenseType:"car",amount:9000,dateAndTime:"3/3/2024  10:59:49 PM"},{expenseType:"car",amount:100,dateAndTime:"3/3/2024  11:01:00 PM"}];
totExp = expenseArray.reduce((elm,acc)=> {
    return  acc + elm.amount},0);
                    

console.log(totExp);
