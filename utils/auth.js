import jwt from 'jsonwebtoken'

const signToken = (user) => {
    const {_id, name, email, isAdmin} = user
    return jwt.sign({
        _id,
        name,
        email,
        isAdmin,
     }, process.env.JWT_SECRET, {
        expiresIn: '30d', // jwt有效时间为30天
    })
}

const isAuth = async (req,res, next) => {
    const {authorization} = req.headers
    if(authorization){
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, process.env.JWT_SECRET, (err,decode) => {
            if(err)
                res.status(401).send({message: 'Token is not valid'})
            else{
                req.user = decode
                next()
            }

        })
    }else{
        res.status(401).send({message: 'Token is not supplied'})
    }
}

export {signToken, isAuth}
