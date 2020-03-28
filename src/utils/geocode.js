const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZmFyYXpzaGFoaWQxIiwiYSI6ImNrN3lvOThpeDAwY2szZ3FxamppMTY5bXMifQ.9W-8GrvP4WnJNYRSnvSSBw'

    request({ url, json: true}, (error, {body}= {})=>{

        if(error){
            callback('Unable to connect to locational services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location try with different search', undefined)
        } else {
           callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
           })
            
        }
    })

}

module.exports = geocode