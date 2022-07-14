import {db} from '../dbStrategy/mongo.js'
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

export async function listChoices(req, res){
    const id = req.params.id
    const verificarId = await db.collection("opcoesdevotos").findOne({
        poolId: id
       })
       if(!verificarId){
        res.sendStatus(404)
        return
       }else{
        db.collection("opcoesdevotos").find({poolId: id}).toArray().then(votos => {
            res.send(votos)
        });
       }
      
  
}
