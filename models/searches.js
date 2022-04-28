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
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY
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

    async weatherPlace (lat,lgt){
        try {
            
        } catch (error) {
            console.log(error);
            
        }
    }

}

module.exports = Searches;