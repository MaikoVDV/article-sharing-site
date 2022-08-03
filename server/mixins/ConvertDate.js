const ConvertDate = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let originalDate = new Date(date)
    let day = originalDate.getDate()
    const month = months[originalDate.getMonth()]
    const year = originalDate.getFullYear();
    switch(day % 10) {
        case 1:
            day = day + "st"
            break;
        case 2:
            day = day + "nd"
            break;
        case 3:
            day = day + "rd"
            break;
        default:
            day = day + "th"
            break;
    }
    return `${day} of ${month} ${year}`
}
module.exports = { ConvertDate }