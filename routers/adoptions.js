const express=require('express');
const adoptionsRouter=express.Router();

//Traigo mi modelo para poder trabajar con él en las peticiones.
const {Adoptions}=require('../db.js');


//Lo que llegue hasta aquí ya va a tener la ruta '/api/v1/adoptions'

//GET
adoptionsRouter.get('/',async(req,res)=>{
    const adoptions=await  Adoptions.findAll();
    res.json(adoptions);
});

//POST
adoptionsRouter.post('/',async(req,res)=>{
    //TODO: Aquí hace falta validar el body que me envían en la petición.
    const adoption=await Adoptions.create(req.body);
    res.json(adoption);
});


module.exports=adoptionsRouter;