import nc from 'next-connect'
import {connect} from "../../../db/config/mongoDB-config";
import User from "../../../db/models/User"
import bcrypt from 'bcryptjs'
import {signToken} from "../../../utils/auth";


const handler = nc()

handler.post(async (req,res)=>{
    await connect()
    const user = await User.findOne({email: req.body.email})
    console.log(bcrypt.compareSync(req.body.password, user.password))
    const {_id, name, email, isAdmin} = user
    if(user && bcrypt.compareSync(req.body.password, user.password)){
        // 发放token
        const token = signToken(user)
        res.send({
            // 将jwt发送到前端，随附一些额外信息，如用户信息
            token,
            _id,
            name,
            email,
            isAdmin,
        })
    }else{
        res.status(401).send({message: 'Invalid email or password'})
    }
})

export default handler
