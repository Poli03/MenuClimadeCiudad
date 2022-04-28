require('dotenv').config()

const { inquirerMenu, pause, readInput, listArray } = require("./helpers/inquirer");
const Searches = require("./models/searches");

const searches = new Searches();

const main = async () =>{

    let opt = '';

    do{
       opt = await inquirerMenu();
       switch (opt) {
           case 1:
               const namePlace = await readInput('Ciudad: ')

               const places = await searches.city(namePlace);

               const id = await listArray(places);
               const placeSel= places.find( l => l.id === id);
            
               console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', placeSel.name.green  );
                console.log('Lat:',  placeSel.lat);
                console.log('Lng:', placeSel.lng);
                console.log('Temperatura:');
                console.log('Mínima:' );
                console.log('Máxima:' );
                console.log('Como está el clima:' );
            break;
       }
       

      if(opt !== 3) await pause();
    }while(opt !== 3);

}

main();