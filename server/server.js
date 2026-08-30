import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './configs/db.js'
dotenv.config()

const app = express()

await connectDb();

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>res.send("API is now working"))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log('Server is running on port '+ PORT)
})

export default app;