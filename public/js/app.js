console.log('Client side javascript is loaded!!');


const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const inputVal = document.getElementById('input-loc');
const formD = document.getElementById('form-d');
const findMe = document.getElementById('find-me-ic');

const messageOne = document.querySelector('#mesOne');
const messageTwo = document.querySelector('#mesTwo');

formD.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = inputVal.value;

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.fdata;
            }
        })
    })

})





// This function handles spinner 

function loading() {
    search.classList.add('loading');

    setTimeout(function() {
        search.classList.remove('loading');
    }, 1500);
}

searchBtn.addEventListener('click', loading);

inputVal.addEventListener('keydown', function() {
    if(event.keyCode == 13){
        loading();
    }
});


// This function handles geolocation from browser..

findMe.addEventListener('click', getGeoLocation);

function getGeoLocation() {
    if(!navigator.geolocation){
        messageOne.textContent = 'Geolocation not supported by your browser.';
    } else {
        messageOne.textContent = 'Locating your co-odrinates....';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function error(){
    messageOne.textContent = 'Unable to retrieve location.';
}

function success(postion) {
    const lat = postion.coords.latitude;
    const lon = postion.coords.longitude;

    // setting all value of content to null.
    messageOne.textContent = '';
    messageTwo.textContent = '';

    // Add function to get weather of current location.
    messageOne.textContent = 'Located, getting weather info for your location.';



    fetch('http://localhost:3000/weather/your-location?lat=' + lat + '&lon=' + lon).then((response) => {
        response.json().then((fdata) =>{
            if(fdata.error){
                messageOne.textContent = fdata.error;
            } else {
                messageOne.textContent = fdata.location;
                inputVal.value = messageOne.textContent;
                messageTwo.textContent = fdata.fData;
            }
        })
    })
}





