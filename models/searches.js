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

    async city (place = ''){   
        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });
            const resp = await intance.get();
            console.log(resp.data);
            return[]
        }
        catch(error){
            return [];
        }
    }

}

module.exports = Searches;