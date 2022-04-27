const axios = require('axios');


class Searches {
    constructor(){
        this.history = [];
    }

    async city (place =  ''){   
        try {
            const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Toluca.json?language=es&access_token=pk.eyJ1IjoiaG1yMTk5NyIsImEiOiJjbDJncDRnZWQwNjVnM2ltc2Z0Mm50MTNxIn0.r_oOMgbzOqNOjmkLEzaUGA');
            console.log(place)
            console.log(resp.data);
            return  [];
        }
        catch(error){
            return [];
        }
    }

}

module.exports = Searches;