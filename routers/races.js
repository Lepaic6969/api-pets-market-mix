const express=require('express');
const racesRouter=express.Router();

//Traigo mi modelo para poder trabajar con él en las peticiones.
const {Races}=require('../db.js');

//Función para validar si un registro existe con el id que le pasamos.
//Esto es exclusivo del método PUT y DELETE.
const validateIfExists=async(raceId)=>{
    const pet=await Races.findOne({where:{id: raceId}});
    return (pet)?true:false;
}

//Lo que llegue hasta aquí ya va a tener la ruta '/api/v1/races'
//GET
racesRouter.get('/',async(req,res)=>{
    const races=await  Races.findAll();
    res.json(races);
});

//POST
racesRouter.post('/',async(req,res)=>{
    //TODO: Aquí hace falta validar el body que me envían en la petición.
    const race=await Races.create(req.body);
    res.json(race);
});

//PUT
racesRouter.put('/:id',async(req,res)=>{
    const raceId=req.params.id;
    const exists= await validateIfExists(raceId); //Este es un booleano que me dice si existe el registro o no.
    if(exists){
        await Races.update(req.body,{
            where:{
                id:raceId
            }
        });
        res.json({success:'Se ha modificado correctamente'});
    }else{
        res.status(404);
        res.json({error:`No se encontró ninguna raza con el id:${raceId}`});
    }

});

//DELETE
racesRouter.delete('/:id',async(req,res)=>{
    const raceId=req.params.id;
    const exists= await validateIfExists(raceId); //Este es un booleano que me dice si existe el registro o no.
    if(exists){
        await Races.destroy({
            where:{id:raceId}
        });
        res.json({success:'Se ha borrado la raza exitosamente'});
    }else{
        res.status(404);
        res.json({error:`No se encontró ninguna raza con el id:${raceId}`});
    }
});


module.exports=racesRouter;