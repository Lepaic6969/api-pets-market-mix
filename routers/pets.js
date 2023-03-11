const express=require('express');
const petsRouter=express.Router();

//Traigo mi modelo para poder trabajar con él en las peticiones.
const {Pets}=require('../db.js');


//Función para validar si un registro existe con el id que le pasamos.
//Esto es exclusivo del método PUT y DELETE.
const validateIfExists=async(petId)=>{
    const pet=await Pets.findOne({where:{id: petId}});
    return (pet)?true:false;
}
//Lo que llegue hasta aquí ya va a tener la ruta '/api/v1/pets'
//GET
petsRouter.get('/',async(req,res)=>{
    const pets=await  Pets.findAll();
    res.json(pets);
});
//GET POR ID
petsRouter.get('/:id',async(req,res)=>{
    const petId=req.params.id;
    const pet=await Pets.findOne({where:{id: petId}});
    if(pet){
        //Si se encontró la mascota con ese id entra aquí...
        res.json(pet);
    }else{
        res.status(404);
        res.json({error:`No se encontró ninguna mascota con el id:${petId}`});
    }
});

//POST

petsRouter.post('/',async(req,res)=>{
    //TODO: Aquí hace falta validar el body que me envían en la petición.
    const pet=await Pets.create(req.body);
    res.json(pet);
});

//PUT

petsRouter.put('/:id',async(req,res)=>{
    //TODO: Aquí hace falta validar el body que me envían en la petición.
    const petId=req.params.id;
    const exists= await validateIfExists(petId); //Este es un booleano que me dice si existe el registro o no.
    if(exists){
        await Pets.update(req.body,{
            where:{
                id:petId
            }
        });
        res.json({success:'Se ha modificado correctamente'});
    }else{
        res.status(404);
        res.json({error:`No se encontró ninguna mascota con el id:${petId}`});
    }
  
});

//DELETE
petsRouter.delete('/:id',async(req,res)=>{
    const petId=req.params.id;
    const exists= await validateIfExists(petId); //Este es un booleano que me dice si existe el registro o no.
    if(exists){
        await Pets.destroy({
            where:{id:petId}
        })
        res.json({success:'Se ha borrado la mascota exitosamente'});
    }else{
        res.status(404);
        res.json({error:`No se encontró ninguna mascota con el id:${petId}`});
    }
   
});

module.exports=petsRouter;
