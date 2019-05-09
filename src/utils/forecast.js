const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/38ca551b102612d6f84987d26d84b273/' + latitude + ',' + longitude + '?units=us'

    //request({url: url, json: true}, (error, response) => {
        request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 
                                    ' degrees out. There is a ' + body.currently.precipProbability + 
                                    '% chance of rain.' 
            )
        }
    })
}

module.exports = forecast