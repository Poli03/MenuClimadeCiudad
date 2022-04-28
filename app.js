require('dotenv').config()

const { inquirerMenu, pause, readInput, listArray } = require("./helpers/inquirer");
const Searches = require("./models/searches");


const main = async () =>{
    const searches = new Searches();
    let opt = '';

    do{
       opt = await inquirerMenu();
       switch (opt) {
           case 1:
               const namePlace = await readInput('Ciudad: ')

               const places = await searches.city(namePlace);

               const id = await listArray(places);
               if (id === '0') continue;

               const placeSel= places.find( l => l.id === id);

               searches.addhistory(placeSel.name);

               const weather = await searches.weatherPlace(placeSel.lat, placeSel.lng)

               console.clear();
               console.log('\nInformación de la ciudad\n'.green);
               console.log('Ciudad:', placeSel.name.green  );
               console.log('Lat:',  placeSel.lat);
               console.log('Lng:', placeSel.lng);
               console.log('Temperatura:', weather.temp);
               console.log('Mínima:',weather.max );
               console.log('Máxima:',weather.max );
               console.log('Como está el clima:',weather.desc.green );
            break;

            case 2:
                searches.historyCapitalized.forEach( (place,i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx}${place}`);
                })
            break;
       }
       

      if(opt !== 3) await pause();
    }while(opt !== 3);

}

main();