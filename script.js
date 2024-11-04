const API_KEY = ''; // OpenWeatherMap API Key


document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherData(city);
        getMap(city);
    } else {
        console.error('City name cannot be empty');
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherDetails = document.getElementById('weather-details');
        weatherDetails.innerHTML = '<p style="color: red;">Error fetching weather data. Please try again.</p>';
    }
}

function displayWeatherData(data) {
    const weatherDetails = document.getElementById('weather-details');
    const map = document.getElementById("gmap_canvas");

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    weatherDetails.innerHTML = `
        <div class="weather-item">
            <img src="https://img.icons8.com/ios/50/000000/thermometer.png" alt="Temperature">
            <p>Temperature: ${data.main.temp}°C (Min: ${data.main.temp_min}°C, Max: ${data.main.temp_max}°C)</p>
        </div>
        <div class="weather-item">
            <img src="https://img.icons8.com/ios/50/000000/windy-weather.png" alt="Wind">
            <p>Wind: ${data.wind.speed} m/s</p>
        </div>
        <div class="weather-item">
            <img src="https://img.icons8.com/ios/50/000000/cloud.png" alt="Clouds">
            <p>Clouds: ${data.clouds.all}%</p>
        </div>
        <div class="weather-item">
            <img src="https://img.icons8.com/ios/50/000000/sunrise.png" alt="Sunrise">
            <p>Sunrise: ${sunrise}</p>
        </div>
        <div class="weather-item">
            <img src="https://img.icons8.com/ios/50/000000/sunset.png" alt="Sunset">
            <p>Sunset: ${sunset}</p>
        </div>
    `;
    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}


