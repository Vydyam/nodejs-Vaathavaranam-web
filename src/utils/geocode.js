const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +  '.json?access_token=pk.eyJ1Ijoia3Jpc2hhZGl0eWE0MTAiLCJhIjoiY2p1cjEzbGF0Mmt4ZDRkbzQwdDR3Y2VsZyJ9.IXUzlY0kO_dXko-eTJQ73g&limit=1'

    //request({url: url, json: true}, (error, response) => {
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.features.length === 0) {
            callback('unable to find the location. Try another search!', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode