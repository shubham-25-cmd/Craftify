import mongoose from 'mongoose'
export const connectDb = async()=>{
try{
await mongoose.connect(`${process.env.MONGO_URI}`)
console.log('Mongodb connected succesfully')
}catch(err){
  console.log('Database is not connected',err)
}
}
