import {db, ObjectId} from '../dbStrategy/mongo.js'
import joi from 'joi'
import dayjs from 'dayjs'

export async function createPoll(req, res){
const dadosEnquete= req.body
const date = dayjs().add(30, 'day').add(1, 'month').locale('pt-br').format('YYYY-MM-DD HH:mm')
const schemaPoll = joi.object({
    title: joi.string().required(),
    expireAt:joi.date().iso() 
})
const { error } = schemaPoll.validate(dadosEnquete)
if(error){
    return res.sendStatus(422)
}
if(!error && dadosEnquete.expireAt == null){
    await db.collection('enquete').insertOne({title : dadosEnquete.title, expireAt: date})
    return res.sendStatus(201)
} 
if(!error && dadosEnquete.expireAt != null){
    await db.collection('enquete').insertOne({title : dadosEnquete.title, expireAt: dadosEnquete.expireAt})
   return  res.sendStatus(201)
   
} 

}

export function listPolls(req,res){
    db.collection("enquete").find().toArray().then(enquetes => {
        res.send(enquetes)
    });
}


export async function resultPoll(req,res){
    const id = req.params.id
    const verificarEnquete= await db.collection("enquete").findOne({
        _id: new ObjectId(id) 
       })
       if(!verificarEnquete){
        res.sendStatus(404)
        return
       }
       const buscarVotos= await db.collection("opcoesdevotos").find({
        poolId: new ObjectId(id)
       }).toArray()
       console.log(ObjectId(buscarVotos[0]._id).str)
       const votos= await db.collection("votos").find({
        choiceId:new ObjectId (buscarVotos[0]._id)
       }).count()
       console.log(votos)
       let maior = votos
       let indice = 0
       for(let i = 0; i < buscarVotos.length; i++){
        const quantidadeVotos = await db.collection("votos").find({
            choiceId:new ObjectId (buscarVotos[i]._id)
           }).count()
        if(quantidadeVotos > maior){
            maior = quantidadeVotos
            indice = i
        }
       }
       res.send({
        id : id,
        title: verificarEnquete.title,
        expireAt: verificarEnquete.expireAt,
        result:{
            title: buscarVotos[indice].title,
            votes : maior
        }
       })
}
