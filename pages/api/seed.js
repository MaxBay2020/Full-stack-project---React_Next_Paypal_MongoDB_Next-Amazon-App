import nc from 'next-connect'
import {connect, disconnect} from '../../db/config/mongoDB-config'
import Product from "../../db/models/Product";
import data from "../../utils/data";
import User from "../../db/models/User";

const handler = nc()

handler.get(async (req,res) =>{
    await connect()

    // 首先，先清楚product和user集合中的所有数据
    await Product.deleteMany()
    await User.deleteMany()

    // 之后，再使用insertMany(数组)来插入一些数据
    await Product.insertMany(data.products)
    await User.insertMany(data.users)

    res.send('Data added!')
    await disconnect()
})

export default handler
