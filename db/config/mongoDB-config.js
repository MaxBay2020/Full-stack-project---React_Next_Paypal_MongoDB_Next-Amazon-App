import mongoose from 'mongoose'


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
        console.log('MongoDB connected!')
    })
}

const disconnect = async ()=>{
    await mongoose.disconnect()
}

const convertDocToObj = (doc) => {
    doc._id = doc._id.toString()
    doc.createdAt = doc.createdAt.toString()
    doc.updatedAt = doc.updatedAt.toString()
    return doc
}

export {connect, disconnect, convertDocToObj}



