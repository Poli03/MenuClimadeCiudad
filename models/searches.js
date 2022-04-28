const axios = require('axios');


class Searches {
    constructor(){
        this.history = [];
    }

    get paramsMapbox() {
        return {
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY
        }
    }

    get paramsOPENWeather() {
        return {
            appid: process.env.OPENWHATER_KEY,
            units:'metric',
            lang:'es'
        }
    }

    async city (place = ''){   
        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });
            const resp = await intance.get();
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
        }
        catch(error){
            return [];
        }
    }

    async weatherPlace (lat,lon){
        try {
            const instance =axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOPENWeather,lat,lon}
            }); 
            const resp =  await instance.get();
            const {weather, main} = resp.data;
          return   {
              desc: weather[0].description,
              min: main.temp_min,
              max: main.temp_max,
              temp: main.temp
          }      
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Searches;