const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=59b5dfa22f215e5090771449051a53b7&units=si'
    request({url, json: true}, (error, {body}) => {
        if(error)   {
            callback('Unable to connect to weather services! Please check internet access', undefined)
        } else if (body.message)    {
            callback('Unable to find location! Please try again', undefined)
        } 
        else {
            callback(undefined, 'It is currently ' + (body.list[0].main.temp - 273) + ' degrees Celsius outside. The temperature feels like ' + (body.list[0].main.feels_like - 273) + ' degrees Celsius.\nHumidity is ' + body.list[0].main.humidity + '%.')
        }
    })    
}

module.exports = forecast