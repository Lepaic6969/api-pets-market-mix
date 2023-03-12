module.exports=(sequelize,type,Pets,Users)=>{ //Traigo los modelos Pets y Users para usar su id como llave foránea.
    return sequelize.define('adoptions',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        petId:type.INTEGER,
        userId:type.INTEGER,
        // petId:{
        //     type:type.INTEGER,
        //     references:{
        //         model:Pets,
        //         key:'id',
        //     }
        // },
        // userId:{
        //     type:type.INTEGER,
        //     references:{
        //         model:Users,
        //         key:'id',
        //     }
        // }
        
    });
}