const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const cors = require('cors')
const dotenv = require("dotenv")
const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config()
app.use("/Public", express.static(path.join(__dirname, "Public")));

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('DB connection successful')
}).catch((error) => {
    console.log(error)
})


const port = process.env.PORT 
app.use(cors())
app.use(express.json())




const postRoute = require('./Routes/postRoute')


app.use('/posts', postRoute)
app.listen(port, () => {
    console.log('server is up on the ' + port)
})

