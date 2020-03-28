const request = require('request')

const forecast = (latitute, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/195ca987ca37b2ade73084bb2b53559c/'+latitute  +',' + longitude +'?units=si'

    request({url, json: true}, (error, {body})=>{

        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
               summary: body.daily.data[0].summary,
               CurrentTemperature: body.currently.temperature,
               RainChances: body.currently.precipProbability 
            })
        }

    })
}

module.exports = forecast
