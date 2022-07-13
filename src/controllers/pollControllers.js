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
    console.log(error)
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
