import { db, ObjectId } from '../dbStrategy/mongo.js'
import joi from 'joi'
export async function createChoice(req, res) {
    const dadosVoto = req.body
    const schemaChoice = joi.object({
        title: joi.string().required(),
        poolId: joi.string().required()
        
    })
    const {error} = schemaChoice.validate(dadosVoto)
    if (error) {
        console.log(error)
        res.sendStatus(422)
        return
    }

    const verificarEnquete = await db.collection("enquete").findOne({
         _id: new ObjectId(dadosVoto.poolId) 
        })
    console.log(verificarEnquete)
    if (!verificarEnquete) {
        res.sendStatus(404)
        return
    }
   
    const verificarOpcoes = await db.collection("opcoesdevotos").findOne({
        title: dadosVoto.title
       })
       if(verificarOpcoes){
        res.sendStatus(409)
        return
       }
       await db.collection('opcoesdevotos').insertOne({title : dadosVoto.title, poolId: dadosVoto.poolId})
    res.sendStatus(201)
}