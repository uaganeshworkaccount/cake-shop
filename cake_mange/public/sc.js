document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('header');

    const currentTime = new Date().getHours();

 

    // Define time-based background colors

    let bgColor;

    if (currentTime >= 6 && currentTime < 12) {

        // Morning (6:00 AM to 11:59 AM)

        bgColor = '#f7dc6f'; // Light yellow

    } else if (currentTime >= 12 && currentTime < 18) {

        // Afternoon (12:00 PM to 5:59 PM)

        bgColor = '#87ceeb'; // Light sky blue

    } else {

        // Evening (6:00 PM to 5:59 AM)

        bgColor = '#343a40'; // Dark blue

    }

 

    // Apply the background color dynamically

header.style.backgroundColor = bgColor;

});