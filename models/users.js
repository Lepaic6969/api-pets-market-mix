module.exports=(sequelize,type)=>{
    return sequelize.define('users',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:type.STRING,
        address:type.STRING,
        phone:type.STRING,
        email:type.STRING
    });
}