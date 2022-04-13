import nc from 'next-connect'
import {connect, disconnect} from "../../../db/config/mongoDB-config";
import Product from "../../../db/models/Product";

const handler = nc()

handler.get(async (req,res) => {
    await connect()
    const products = await Product.find({})

    res.send(products)
    await disconnect()
})

export default handler

