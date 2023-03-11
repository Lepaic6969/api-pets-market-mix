module.exports=(sequelize,type)=>{
    return sequelize.define('races',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:type.STRING,
        species:type.STRING
    });
}