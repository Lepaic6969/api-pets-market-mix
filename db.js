//Este archivo tiene todas las configuraciones de la conexión con mi base de datos.
//Al exportar este archivo también se exportan los modelos de la aplicación.
const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME}=require('./config.js');

//1. IMPORTO SEQUELIZE A MI PROYECTO Y LO INSTANCIO
const Sequelize=require('sequelize');
                            //(name_DB,usuario,contraseña)
// const sequelize=new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
//     host:DB_HOST,
//     dialect:'mysql',
//     dialectOptions: {
//         ssl: false
//     }

// })
// const sequelize=new Sequelize('pet_db','root','Abc1234567890',{
//     host:'localhost',
//     dialect:'mysql'
// })
const fs = require('fs');
const path = require('path');
// Ruta del archivo de certificado y clave
const sslCertPath = path.join(__dirname, 'ssl', 'server-cert.pem');
const sslKeyPath = path.join(__dirname, 'ssl', 'server-key.pem');

// Lee el certificado y la clave
const sslCert = fs.readFileSync(sslCertPath);
const sslKey = fs.readFileSync(sslKeyPath);

const sequelize=new Sequelize('pet_db','nkue5o3m74prpp9vuk39','pscale_pw_pqjJW2B3IBpKCtfT2TMsrxpiSBEIEJhVSLK8UQoTPWQ',{
    host:'us-east.connect.psdb.cloud',
    dialect:'mysql',
    dialectOptions: {
        ssl: {
            cert: sslCert,
            key: sslKey,
            rejectUnauthorized: false // Establece en falso para aceptar certificados autofirmados
          }
    }
})

//2.TRAIGO MIS MODELOS PREVIAMENTE CREADOS EN UN FICHERO DE LA CARPETA MODELS.
//NOTA: Como lo tengo definido como una func8ión, acá debo ejecutarla pasándole los parámetros que requiere.




const racesModel=require('./models/races.js');
const Races=racesModel(sequelize,Sequelize);

const usersModel=require('./models/users.js');
const Users=usersModel(sequelize,Sequelize);

const petsModel=require('./models/pets.js');
const Pets=petsModel(sequelize,Sequelize,Races);

const adoptionsModel=require('./models/adoptions.js');
const Adoptions=adoptionsModel(sequelize,Sequelize,Pets,Users);


//3.SINCRONIZAMOS NUESTROS MODELOS YA CREADOS CON LA BASE DE DATOS...
sequelize.sync({force:false})
    .then(()=>{
        console.log("Tablas Sincronizadas")
    })

//4.EXPORTO ESTOS MODELOS PARA USARLOS EN CULAQUER PARTE DE MI APLICACIÓN.
module.exports={
    Adoptions,
    Pets,
    Races,
    Users
    
}
