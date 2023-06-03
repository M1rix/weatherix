const URL_FOR_CURRENT = 'https://api.weatherapi.com/v1/current.json'
const KEY = '44511effd1084a909d5122042232905';

function search() {
    document.querySelector('.weatherix').style.height = '105px';
    const errorBlock = document.querySelector('#error-block');
    const successBlock = document.querySelector('#success-block');
    if(!errorBlock.classList.contains('d-none')){
        errorBlock.classList.add('d-none');
    } if(!successBlock.classList.contains('d-none')){
        successBlock.classList.add('d-none');
    }
    const lang  = document.querySelector('#lang').value;
    const location = document.querySelector('#location');
    const value = location.value.trim();
    if (value.length > 0) {
        fetch(URL_FOR_CURRENT + '?q=' + value + '&key=' + KEY + '&lang='+lang)
            .then(response => response.json())
            .then(json => setTimeout(()=> handleResponseJson(json), 400));
    }
}

function handleResponseJson(json) {
    const weatherix = document.querySelector('.weatherix');
    const errorBlock = document.querySelector('#error-block');
    const successBlock = document.querySelector('#success-block');

    if (json.error) {
        errorBlock.classList.remove('d-none');
        errorBlock.classList.remove('opacity-0');
        weatherix.style.height = '605px';
        return;
    }

    const current = json.current;
    const location = json.location;
    const localTempType = localStorage.getItem('temp-type') ?? 'c';

    const locationText = document.querySelector('#location-text');
    locationText.innerHTML = '<b>'+location.name+'</b>, <small>'+location.region+'</small>, <small>'+location.country+'</small> ';

    const icon = document.querySelector('#condition-icon');
    icon.style.background = 'url(https:' + current.condition.icon + ')';
    icon.style.backgroundSize = 'cover';

    const text = document.querySelector('#condition-text');
    text.textContent = current.condition.text;

    const temp = document.querySelector('#temp-text');
    temp.innerHTML = (localTempType?.endsWith('c') ? current.temp_c : current.temp_f) + ' ' + '<small id="temp-type">' + (localTempType?.endsWith('c') ? '℃' : '℉') + '</small>';

    const tempFellsLike = document.querySelector('#temp-feels-like-text');
    tempFellsLike.innerHTML = 'Real Feel©  ' + (localTempType?.endsWith('c') ? current.feelslike_c : current.feelslike_f) + ' ' + '<small id="feelslike-type">' + (localTempType?.endsWith('c') ? '℃' : '℉') + '</small>';

    const humidity = document.querySelector('#humidity');
    humidity.textContent = current.humidity + '%';

    const wind = document.querySelector('#wind-speed');
    wind.textContent = current.wind_kph +'km/h';

    successBlock.classList.remove('d-none');
    successBlock.classList.remove('opacity-0');
    weatherix.style.height = '605px';

    isFirstRequest = false;
}
