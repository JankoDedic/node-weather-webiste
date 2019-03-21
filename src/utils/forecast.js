const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/2ad09922d10ffe6fa0e7cef4330b5fe3/${latitude},${longitude}?units=si`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const summary = body.daily.data[0].summary
            const temp = body.currently.temperature
            const prob = body.currently.precipProbability

            const s1 = `It is currently ${temp} degrees out.`
            const s2 = `There is a ${prob}% chance of rain.`

            const high = body.daily.data[0].temperatureHigh
            const low = body.daily.data[0].temperatureLow
            const s3 = `The high today is ${high} with a low of ${low}.`

            callback(undefined, `${summary}\n${s1}\n${s2}\n${s3}`)
        }
    })
}

module.exports = forecast