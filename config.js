const PORT=process.env.PORT || 3000; //Puerto del servidor.
const DB_HOST=process.env.DB_HOST||'localhost';
const DB_USER=process.env.DB_USER||'root';
const DB_PASSWORD=process.env.DB_PASSWORD || 'Abc1234567890';
const DB_NAME=process.env.DB_NAME || 'pet_db';
const DB_PORT=process.env.DB_PORT||3306; //Puerto de la base de datos.

module.exports={
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
}