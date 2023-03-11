const express=require('express');
const usersRouter=express.Router();

//Traigo mi modelo para poder trabajar con él en las peticiones.
const {Users}=require('../db.js');

//Función para validar si un registro existe con el id que le pasamos.
//Esto es exclusivo del método PUT y DELETE.
const validateIfExists=async(userId)=>{
    const user=await Users.findOne({where:{id: userId}});
    return (user)?true:false;
}

//Lo que llegue hasta aquí ya va a tener la ruta '/api/v1/users'
//GET
usersRouter.get('/',async(req,res)=>{
    const users=await  Users.findAll();
    res.json(users);
});
//GET POR ID
usersRouter.get('/:id',async(req,res)=>{
    const userId=req.params.id;
    const user=await Users.findOne({where:{id: userId}});
    if(user){
        //Si se encontró el usuario con ese id entra aquí...
        res.json(user);
    }else{
        res.status(404);
        res.json({error:`No se encontró ningun usuario con el id:${userId}`});
    }
});

//POST
usersRouter.post('/',async(req,res)=>{
    //TODO: Aquí hace falta validar el body que me envían en la petición.
    const user=await Users.create(req.body);
    res.json(user);
});

//PUT

usersRouter.put('/:id',async(req,res)=>{
    //TODO: Aquí hace falta validar el body que me envían en la petición.
    const userId=req.params.id;
    const exists= await validateIfExists(userId); //Este es un booleano que me dice si existe el registro o no.
    if(exists){
        await Users.update(req.body,{
            where:{
                id:userId
            }
        });
        res.json({success:'Se ha modificado correctamente'});
    }else{
        res.status(404);
        res.json({error:`No se encontró ningun usuario con el id:${userId}`});
    }
  
});

//DELETE
usersRouter.delete('/:id',async(req,res)=>{
    const userId=req.params.id;
    const exists= await validateIfExists(userId); //Este es un booleano que me dice si existe el registro o no.
    if(exists){
        await Users.destroy({
            where:{id:userId}
        })
        res.json({success:'Se ha borrado el usuario exitosamente'});
    }else{
        res.status(404);
        res.json({error:`No se encontró ningun usuario con el id:${userId}`});
    }
   
});



module.exports=usersRouter;