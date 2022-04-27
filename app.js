require('dotenv').config()

const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
const Searches = require("./models/searches");

const searches = new Searches();

const main = async () =>{

    let opt = '';

    do{
       opt = await inquirerMenu();
       switch (opt) {
           case 1:
               const place = await readInput('Ciudad: ')

               await searches.city(place);
            break;
       }
      if(opt !== 3) await pause();
    }while(opt !== 3);

}

main();