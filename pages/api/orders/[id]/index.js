import nc from 'next-connect'
import {connect} from "../../../../db/config/mongoDB-config";
import Order from "../../../../db/models/Order";
import {isAuth} from "../../../../utils/auth";


const handler = nc()

handler.use(isAuth)

handler.get(async (req,res) => {
    await connect()
    const order = await Order.findById(req.query.id)
    res.send(order)
})

export default handler
