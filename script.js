const baseurl = "http://api.weatherapi.com/v1/current.json?key=1dfeb1fafb7b450a98b143039240803&q=";


document.getElementById("submitButton").addEventListener('click', function() {
    const location = document.getElementById("textInput").value;
    getWeatherDataFromAPI(location);
});

function getWeatherDataFromAPI(location) {
    Promise.all([
        fetch(`http://api.weatherapi.com/v1/current.json?key=1dfeb1fafb7b450a98b143039240803&q=${location}`, { mode: 'cors' }).then(response => response.json()),
        fetch(`http://api.weatherapi.com/v1/marine.json?key=1dfeb1fafb7b450a98b143039240803&q=${location}`, { mode: 'cors' }).then(response => response.json()),
        fetch(`http://api.weatherapi.com/v1/forecast.json.json?key=1dfeb1fafb7b450a98b143039240803&q=${location}`, { mode: 'cors' }).then(response => response.json())
    ])
    .then(function(responses) {
        const [currentWeather, marineWeather, forecastWeather] = responses;
        console.log('Current weather:', currentWeather);
        console.log('Marine weather:', marineWeather);
        console.log('Forecast weather:', forecastWeather);
        fillData(currentWeather, marineWeather, forecastWeather);
    })
    .catch(error => console.error('Error fetching data:', error));
};

function fillData(currentWeather, marineWeather, forecastWeather){
    const weatherConIcon = document.getElementById("weather_con_icon");
    const weatherConText = document.getElementById("weather_con_text");
    const currentTemp = document.getElementById("current_temp");
    const maxTemp = document.getElementById("max_temp");
    const minTemp = document.getElementById("min_temp");
    const fellsLike = document.getElementById("feels_like");
    const humidity = document.getElementById("humidity");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");
    const windspeed = document.getElementById("wind_speed");
    const windspeedMax = document.getElementById("wind_speed_max");
    const windDirection = document.getElementById("wind_dir");
    const windDegree = document.getElementById("wind_degree");
    const swellDirectionDegree = document.getElementById("swell_dir_deg");
    const swellDirectionComp = document.getElementById("swell_dir_comp");
    const swellWaveHeight = document.getElementById("swell_wave_height");
    const swellPeriod = document.getElementById("swell_period");
    const waterTemp = document.getElementById("water_temp");
    const uvIndex = document.getElementById("uv_index");

    weatherConText.src = currentWeather.current.condition.text;
    //weatherConIcon.textContent += currentWeather.current.condition.icon;
    currentTemp.textContent += currentWeather.current.temp_c;
    maxTemp.textContent += forecastWeather.forecast.forecastday[0].day.maxtemp_c;
    minTemp.textContent += forecastWeather.forecast.forecastday[0].day.mintemp_c;
    fellsLike.textContent += currentWeather.current.feelslike_c;
    humidity.textContent += currentWeather.current.humidity;
    sunrise.textContent += forecastWeather.forecast.forecastday[0].astro.sunrise;
    sunset.textContent += forecastWeather.forecast.forecastday[0].astro.sunset;
    windspeed.textContent += currentWeather.current.wind_kph;
    windspeedMax.textContent += forecastWeather.forecast.forecastday[0].day.maxwind_kph; 
    windDirection.textContent += currentWeather.current.wind_dir;
    windDegree.textContent += currentWeather.current.wind_degree;
    // swellDirectionDegree.textContent += response.current.condition.text; 
    // swellDirectionComp.textContent += response.current.condition.text;
    // swellWaveHeight.textContent += response.current.condition.text;
    // swellPeriod.textContent += response.current.condition.text;
    // waterTemp.textContent += response.current.condition.text;
    // uvIndex.textContent += response.current.uv;
}

