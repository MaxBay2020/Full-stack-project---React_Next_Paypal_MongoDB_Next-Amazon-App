import nc from 'next-connect'
import {connect} from "../../../db/config/mongoDB-config";
import User from "../../../db/models/User"
import bcrypt from 'bcryptjs'
import {signToken} from "../../../utils/auth";


const handler = nc()

handler.post(async (req,res)=>{
    const {name, email} = req.body
    await connect()
    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false
    })

    const user = await newUser.save()

    const token = signToken(user)
    res.send({
        // 将jwt发送到前端，随附一些额外信息，如用户信息
        token,
        _id: user._id,
        name,
        email,
        isAdmin: user.isAdmin
    })
})

export default handler
