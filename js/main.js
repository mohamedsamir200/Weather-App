let toTop = document.querySelector(".to-top");
// ===========================================//

// =============  Today Card ===========================//
let today = document.getElementById("today");
let todayDate = document.getElementById("today-date");
let cityLocation = document.getElementById("location");
let todayDegree = document.getElementById("today-degree");
let todayIcon = document.getElementById("today-icon");
let todayDescription = document.getElementById("today-description");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");
let searchBar = document.getElementById("search");
let currentCity = "cairo";

// =============  Next Day Card ===========================//

let nextDay = document.getElementsByClassName("next-day");
let nextDatDate = document.getElementsByClassName("next-day-date");
let nextDayIcon = document.getElementsByClassName("next-day-icon");
let maxDegree = document.getElementsByClassName("max-degree");
let minDegree = document.getElementsByClassName("min-degree");

let nextDescription = document.getElementsByClassName("next-description");

let dataResponse;


//=============== Get Data From Api =========================
let months = ["Jan", "Jeb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function getData() {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=848e4c9efef048e494f100521210205&q=${currentCity}&days=3&aqi=no&alerts=no`);
    dataResponse = (await response.json());
    displayTodayWeather();
    displayNextDay();
}
getData();


//=============== Display Today Weather ========================= //

let date = new Date();
function displayTodayWeather() {
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${months[date.getMonth()]}`;
    cityLocation.innerHTML = dataResponse.location.name;
    todayDegree.innerHTML = `${dataResponse.current.temp_c}<sup>&deg;</sup>C`;
    todayIcon.setAttribute("src", `https:${dataResponse.current.condition.icon}`);
    todayDescription.innerHTML = dataResponse.current.condition.text;
    humidity.innerHTML = `${dataResponse.current.humidity} % `;
    wind.innerHTML = `${dataResponse.current.wind_kph} km/h `;
    compass.innerHTML = `${dataResponse.current.wind_dir}`;
}


//=============== Display Next Day Weather ========================= //
function displayNextDay() {
    for (let i = 0; i < nextDay.length; i++) {
        let dataObj = dataResponse.forecast.forecastday[i + 1].date;
        let dayObj = dataResponse.forecast.forecastday[i + 1].day;

        nextDay[i].innerHTML = days[new Date(dataObj).getDay()];
        nextDatDate[i].innerHTML = `${new Date(dataObj).getDate()} ${months[new Date(dataObj).getMonth()]}`;
        nextDayIcon[i].setAttribute("src", `https:${dayObj.condition.icon}`);
        maxDegree[i].innerHTML = `${dayObj.maxtemp_c}<sup>&deg;</sup>C`;
        minDegree[i].innerHTML = `${dayObj.mintemp_c}<sup>&deg;</sup>C`;
        nextDescription[i].innerHTML = dayObj.condition.text;
    }
}

//=============== Real Time Search ========================= //

searchBar.addEventListener("input", () => {
    currentCity = searchBar.value;
    getData();
});


//========== To Top ============// 
window.onscroll = function () {
    if (scrollY > 600) {
        toTop.style.opacity = 1;
    } else {
        toTop.style.opacity = 0;
    }
};
toTop.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}


