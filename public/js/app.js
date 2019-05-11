// console.log('client side java script file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#placename')
const messageTwo = document.querySelector('#latandlong')
const messageThree = document.querySelector('#forecast')

//messageOne.textContent = 'From Javascript'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    //console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    //fetch('http://localhost:3000/weather?address='+location+'').then((response) => { // Commented as Heroku launches the app and localhost doesn't work
    fetch('/weather?address='+location+'').then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                messageThree.textContent = data.coordinates
            }

        })
    })

})