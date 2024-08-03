document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function getWeather(city) {
    const apiKey = 'e1bcd4fa857fb5bf2346c79ae2c99ef0'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            document.getElementById('weather-info').innerHTML = `<p>City not found: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        document.getElementById('weather-info').innerHTML = '<p>Error fetching the weather data.</p>';
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherInfo.classList.add('show');
}

// Create raindrops
function createRaindrops() {
    const rainContainer = document.querySelector('.rain');
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.classList.add('drop');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 2 + 2}s`;
        rainContainer.appendChild(drop);
    }
}

createRaindrops();

// Hide weather info when clicking outside
document.addEventListener('click', (event) => {
    const weatherInfo = document.getElementById('weather-info');
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');

    if (
        !weatherInfo.contains(event.target) &&
        !cityInput.contains(event.target) &&
        !searchBtn.contains(event.target)
    ) {
        weatherInfo.classList.remove('show');
    }
});
