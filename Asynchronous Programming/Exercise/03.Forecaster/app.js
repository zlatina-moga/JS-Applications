const currentDiv = document.getElementById('current');
const forecastDiv = document.getElementById('forecast');
const upcomingDiv = document.getElementById('upcoming');
const button = document.getElementById('submit');

const weatherMap = {
    'Sunny': '☀',
    'Partly sunny': '⛅',
    'Overcast': '☁',
    'Rain': '☂',
    'Degrees': '°'
};

function attachEvents() {
    button.addEventListener('click', getWeather);
}

attachEvents();

async function getWeather(){
    forecastDiv.style.display = 'block'

    const input = document.getElementById('location');
    const cityName = input.value;
    input.value = '';

    const code = await getCode(cityName);
    const [current, upcoming] = await Promise.all([
        getCurrent(code),
        getUpcoming(code)
    ])
    button.disabled = true;
}


async function getCode(cityName){
    const url = `http://localhost:3030/jsonstore/forecaster/locations`;
    const response = await fetch(url);
    const data = await response.json();

    return data.find(x=> x.name.toLowerCase() == cityName.toLowerCase()).code;
}

async function getCurrent(code){
    const url = `http://localhost:3030/jsonstore/forecaster/today/` + code;
    const response = await fetch(url);
    const data = await response.json();

    const divForecasts = e('div', 'forecasts');
    const spanForecasts = e('span', 'condition symbol', weatherMap[data.forecast.condition]) 
    const spanForecastCondition = e('span', 'condition');
    const locationNameSpan = e('span', 'forecast-data', data.name);
    const degreesSpan = e('span', 'forecast-data', `${data.forecast.low}${weatherMap['Degrees']}/${data.forecast.high}${weatherMap['Degrees']}`);
    const conditionSpan = e('span', 'forecast-data', data.forecast.condition);

    spanForecastCondition.appendChild(locationNameSpan);
    spanForecastCondition.appendChild(degreesSpan);
    spanForecastCondition.appendChild(conditionSpan);

    divForecasts.appendChild(spanForecasts);
    divForecasts.appendChild(spanForecastCondition);

    currentDiv.appendChild(divForecasts)

    return data;
}

async function getUpcoming(code){
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/` + code;
    const response = await fetch(url);
    const data = await response.json();

    const forecastInfoDiv = e('div', 'forecast-info');

    const forecasts = data.forecast;
    [...forecasts].forEach(forecast => {
        const upcomingSpan = e('span', 'upcoming');
        const symbolSpan = e('span', 'symbol', weatherMap[forecast.condition]);
        const weatherConditionSpan = e('span', 'forecast-data', `${forecast.low}${weatherMap['Degrees']}/${forecast.high}${weatherMap['Degrees']}`);
        const conditionNameSpan = e('span', 'forecast-data', forecast.condition);

        upcomingSpan.appendChild(symbolSpan);
        upcomingSpan.appendChild(weatherConditionSpan)
        upcomingSpan.appendChild(conditionNameSpan)

        forecastInfoDiv.appendChild(upcomingSpan)
    })
    
    upcomingDiv.appendChild(forecastInfoDiv)
    
    return data
}

function e(type, classType, content){
    const result = document.createElement(type);
    result.className = classType;
    if (content){
        result.innerHTML = content
    }
    return result
}