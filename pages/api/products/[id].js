import nc from 'next-connect'
import {connect} from "../../../db/config/mongoDB-config";
import Product from "../../../db/models/Product";


const handler = nc()

handler.get(async (req,res) => {
    await connect()
    const product = await Product.findById(req.query.id)
    res.send(product)
})

export default handler
