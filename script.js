const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time-location span");
const timeField = document.querySelector(".time-location p");
const conditionTextField = document.querySelector(".weather-condition span");
const conditionIconField = document.querySelector(".weather-condition img");
const searchField = document.querySelector(".search-location");
const searchBtn = document.querySelector(".search");

searchBtn.addEventListener("click", function(e) {
    e.preventDefault();
    const cityName = searchField.value;
    // console.log(cityName);
    fetchDetails(cityName);
});

async function fetchDetails(cityName) {
    try{
        const url = `http://api.weatherapi.com/v1/current.json?key=968182571f5040b3bfc74722230912&q=${cityName}&aqi=no`;
        const response = await fetch(url);
        // console.log(response);
        const data = await response.json();
        console.log(data);
        const fullCityName = data.location.name;
        if(cityName.toUpperCase() !== fullCityName.toUpperCase())
        {
            alert("Please enter a valid city name");
            searchField.value = "";
            return;
        }
        const temperature = data.current.temp_c;
        const timeAndDate = data.location.localtime;
        const conditionIcon = data.current.condition.icon;
        const conditionText = data.current.condition.text;
        // console.log(temperature, time, conditionIcon, conditionText);
        updateDOM(fullCityName, temperature, timeAndDate, conditionText, conditionIcon);
    }
    catch(err){
        alert("Please enter a valid city name");
        searchField.value = "";
        console.log(err);
    }
}

function updateDOM(fullCityName, temperature, timeAndDate, conditionText, conditionIcon){
    temperatureField.innerHTML = temperature;
    cityField.innerHTML = fullCityName;
    const dateandtimeArr = timeAndDate.split(" ");
    // console.log(dateandtimeArr);
    const date = dateandtimeArr[0];
    const time = dateandtimeArr[1];
    const day = new Date(date).getDay();
    const dayName = getDayName(day);
    // console.log(date, time, day, dayName);
    timeField.innerHTML = `${time} ${dayName} ${date}`;
    conditionTextField.innerHTML = `${conditionText}`;
    conditionIconField.src = `${conditionIcon}`;
    searchField.value = "";
}

function getDayName(day){
    switch(day){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't Know";
    }
}

    