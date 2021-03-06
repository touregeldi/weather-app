const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Location not found. Try again!'
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = `It is ${data.forecast.temperature} degrees out and ${data.forecast.weather_descriptions}. But it feels like ${data.forecast.feelslike} degrees out. Wind speed ${data.forecast.wind_speed} m/s`
            }
        })
    })


})