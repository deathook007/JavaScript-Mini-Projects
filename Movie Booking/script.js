const container = document.querySelector('.container2');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movie = document.getElementById('movie');
const count = document.getElementById('count');
const total = document.getElementById('total');

// In starting of everything this function will populate the UI
populateUI();

// +is used to convert to integer type directly
let price = +movie.value;

// Functions
function updateCount() {
    // We want length of array 
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // ** Make new array of selected seats index to save in local storage
    // Converting node list into regular array and map(returns an array of looped results)
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // Storing seats at local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const seatCount = selectedSeats.length;
    // Changing the inner text
    count.innerText = seatCount;
    total.innerText = seatCount * price;
}

function movieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Populating UI with local storage data
function populateUI() {
    // Coneverting back to araay
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    // Populating movie index from local storage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movie.selectedIndex = selectedMovieIndex;
    }
}

// Adding event listeners
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // Toggle add or remove
        e.target.classList.toggle('selected');
        updateCount();
    }
});

// change EventListener for changing on select
movie.addEventListener('change', e => {
    price = +e.target.value;
    // Storing movie index and value to localStorage "selectedIndex to get index"
    movieData(e.target.selectedIndex, e.target.value);
    updateCount();
});

// Count and total on page load
updateCount();