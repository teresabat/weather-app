const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperatura');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// api
const API_KEY = "97c5e0f242d9bc920b0a3d6414934048";

// func to formate the date
function formatDate(date) {
    const option = { weekday: 'long', year:'numeric', month: 'long', day:'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

// search weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(
           `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br` 
        );

     if (!response.of) {
        throw new Error ("Cidade não encontrada!");
    }

        const data = await response.json();
            displayWeather(data);
                 } catch (error) {
            alert(error.message);
     }
}   

//show weather datas
function displayWeather(data) {
    cityName.textContent = data.name;
    currentDate.textContent = formateDate(new Date());
    temperature.textcontet = `${Math.round(data.main.temp)}ºC`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

    //update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

//event of click in search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city){
        fetchWeather(city);
    } else {
        alert ("Digite uma cidade!");
    }
});

// search weater when press enter
cityInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});

//get weather for a default city on page load
window.addEventListener('load', () => {
    fetchWeather("Rio de Janeiro");
});