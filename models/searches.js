const fs = require('fs');
const axios = require('axios');


class Searches {
    constructor(){
        this.history = [];
        this.dbPath= './db/database.json';
        this.readDB();
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

    get historyCapitalized() {
        return this.history.map( place => {

            let words = place.split(' ');
            words = words.map( p => p[0].toUpperCase() + p.substring(1) );

            return words.join(' ')

        })
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

    addhistory(place = ''){
        if( this.history.includes( place.toLocaleLowerCase() ) ){
            return;
        }
        this.history = this.history.splice(0,5);

        this.history.unshift(place.toLocaleLowerCase());

        this.saveDB();
    }

    saveDB() {

        const payload = {
            history: this.history
        };

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );

    }

    readDB() {

        if( !fs.existsSync( this.dbPath ) ) return;
        
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info );

        this.history = data.history;


    }
}

module.exports = Searches;