
function ToTodaysDate() {
    const today = new Date();

// Get the start of the month (1st day)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Create an array of dates from the start of the month to today
    const dateList = [];
    let currentDate = startOfMonth;

    while (currentDate <= today) {
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    dateList.push(formattedDate);
    
    // Increment the date by one day
    currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateList
}
