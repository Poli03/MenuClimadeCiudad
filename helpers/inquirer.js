require(`colors`);
const inquirer = require(`inquirer`);

const ask = [
    {
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.red} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.red} Historial`
            },
            {
                value: 3,
                name: `${'3.'.red} Salir`
            }
        ]
    }
];


const inquirerMenu= async() => {
    console.clear();
    console.log('~~~~~~~~~~~~~~~~~~~~~~'.brightRed);
    console.log(' Selecione una opcion'.blue);
    console.log('~~~~~~~~~~~~~~~~~~~~~~\n'.brightRed);

    const {option}= await inquirer.prompt(ask);

    return option;
}

const pause= async() =>{
    const question= [
        {
            type: 'input',
            name: 'enter',
            message:`Precione ${'Enter'.bgGreen} para continuar`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async(message) =>{
    const question=[
     {
        type: 'input',
        name: 'desc',
        message,
        validate( value ){
            if(value.length === 0){
                return 'Debe ingresar un valor';
            }
            return true;
        }
     }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listArray = async( elements = []) => {
    const choices = elements.map( (element, i) =>{
        const idx = `${i + 1}`.yellow;
        return {
            value: element.id,
            name: `${idx} ${element.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.yellow + 'Cancelar'
    });

    const asks = [
        {
            type: 'list',
            name: 'id',
            message: 'Selecione: ',
            choices
        }
    ]
    const {id} = await inquirer.prompt(asks);
    return id;
}

const confirm = async(message) => {
    const question =[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const showListChecklist = async( tasks = []) => {
    const choices = tasks.map( (task, i) =>{
        const idx = `${i + 1}`.yellow;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completedin) ? true : false
        }
    });

    const asks = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(asks);
    return ids;
}

module.exports= {
     inquirerMenu,
     pause,
     readInput,
     listArray,
     confirm,
     showListChecklist
}
