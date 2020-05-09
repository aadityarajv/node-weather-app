const request = require('postman-request');

const forecasts = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3c3f225d153388192d64faffb2eb1326&query=' + latitude + ',' + longitude;

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services!', undefined);
        } else if(body.error){
            callback('Unable to find location, Please search diffrent..', undefined);
        }else {
            callback(undefined, {
                location: body.location.name + ', ' + body.location.region + ', ' + body.location.country,
                fData: body.current.weather_descriptions[0] + ', There is a ' + body.current.precip + '% chance of rain. The current temprature ' + body.current.temperature + ' degress out, but feels like ' + body.current.feelslike + ' degrees.'
            })
            //{
            //     name: response.body.location.name,
            //     region: response.body.location.region,
            //     temperature: response.body.current.temperature,
            //     feels_like: response.body.current.feelslike,
            //     chances_of_rain: response.body.current.precip,
            //     forcasts: response.body.current.weather_descriptions
            // }
        }
    })
}



module.exports = forecasts