import { db, ObjectId } from '../dbStrategy/mongo.js'
import joi from 'joi'
import dayjs from 'dayjs'
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
       await db.collection('opcoesdevotos').insertOne({title : dadosVoto.title, poolId: new ObjectId (dadosVoto.poolId)})
    res.sendStatus(201)
}

export async function votes(req, res){
    const id = req.params.id
    const date = dayjs().locale('pt-br').format('YYYY-MM-DD HH:mm')
    const verificarOpcoes= await db.collection("opcoesdevotos").findOne({
        _id: new ObjectId(id) 
       })
   if(!verificarOpcoes){
    res.sendStatus(404)
   }else{
    await db.collection('votos').insertOne({createdAt: date, choiceId: new ObjectId (id)})
    return  res.sendStatus(201)
   }
}
export async function listChoices(req, res){
    const id = req.params.id
    const verificarId = await db.collection("opcoesdevotos").findOne({
        poolId: new ObjectId (id)
       })
       if(!verificarId){
        res.sendStatus(404)
        return
       }else{
        db.collection("opcoesdevotos").find({poolId:new ObjectId(id)}).toArray().then(votos => {
            res.send(votos)
        });
       }   
  
}
