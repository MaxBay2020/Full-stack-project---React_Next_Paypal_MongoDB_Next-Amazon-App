import nc from 'next-connect'
import {connect, disconnect} from "../../../db/config/mongoDB-config";
import Order from "../../../db/models/Order";
import {onError} from '../../../utils/error'
import {isAuth} from "../../../utils/auth";

const handler = nc({
    onError,
})

handler.use(isAuth)

handler.post(async(req,res) => {
    await connect()
    const newOrder = new Order({
        ...req.body,
        user: req.user._id
    })
    const order = await newOrder.save()
    res.status(201).send(order)

})

export default handler

