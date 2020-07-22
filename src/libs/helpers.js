/**
 * The function returns the weekday
 */
const getDay = () => {
    let d = new Date();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return weekday[d.getDay()];
};

/**
 * The function returns the date and month
 */
const getDate = () => {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

/**
 * The function returns the formatted hours and minutes
 * The minutes are represented as 2 numbers
 */
const getHours = () => {
    let d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).length > 1 ? d.getMinutes() : '' + 0 + d.getMinutes()}`;
};

export { getDay, getDate, getHours };