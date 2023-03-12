
module.exports=(sequelize,type,Races)=>{ //Traigo el modelo Races para usar su id como llave foránea.
    return sequelize.define('pets',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:type.STRING,
        gender:type.STRING,
        age:type.INTEGER,
        description:type.STRING,
        image:type.STRING,
        available:type.BOOLEAN,
        raceId:type.INTEGER
        //Esta es la llave foranea
        // raceId:{
        //     type:type.INTEGER,
        //     references:{
        //         model:Races,
        //         key:'id'
        //     }
        // }
        
    });
}