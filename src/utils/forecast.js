const request = require('request')



const forecast = (lattitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f9953132f022ca664f7bf498e5df86e1&query=' + lattitude +',' + longitude + '&units=m'
    request({url,json:true},(error,{ body }) => {
        if(error) {
            callback('Unable to connect to loaction',undefined)
        }
        else if (body.error ){
            callback('Unable to find the location, Try Another search',undefined)
        }
        else {
            
            callback(undefined,body.current.weather_descriptions+ '. It Feels Like  ' + body.current.feelslike + '° Celcius , But its '+ body.current.temperature + '° Celcius Out There' + 
            '. And Humidity is '+ body.current.humidity + '% ' + '. Latitude of you location is ' + body.location.lat + ', Longitude of your location is '
            + body.location.lon                 
            )
            
                
        }
    })

}

module.exports = forecast