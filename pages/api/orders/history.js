import nc from 'next-connect'
import {connect, disconnect} from "../../../db/config/mongoDB-config";
import Order from "../../../db/models/Order";
import {onError} from '../../../utils/error'
import {isAuth} from "../../../utils/auth";

const handler = nc({
    onError,
})

handler.use(isAuth)

handler.get(async(req,res) => {
    await connect()
    const orders = await Order.find({user: req.user._id})
    res.send(orders)

})

export default handler

