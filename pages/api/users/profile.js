import nc from 'next-connect'
import {connect} from "../../../db/config/mongoDB-config";
import User from "../../../db/models/User"
import bcrypt from 'bcryptjs'
import {isAuth, signToken} from "../../../utils/auth";


const handler = nc()
handler.use(isAuth)

handler.put(async (req,res)=>{
    await connect()

    const user = await User.findById(req.user._id)

    user.name = req.body.name
    user.email = req.body.email
    user.password=req.body.password ?
        bcrypt.hashSync(req.body.password) : user.password

    await user.save()

    const token = signToken(user)
    res.send({
        // 将jwt发送到前端，随附一些额外信息，如用户信息
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
})

export default handler
