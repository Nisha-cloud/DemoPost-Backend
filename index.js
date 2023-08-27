const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const dotenv = require("dotenv")
const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('DB connection successful')
}).catch((error) => {
    console.log(error)
})


const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())




const postRoute = require('./Routes/postRoute')


app.use('/posts', postRoute)
app.listen(port, () => {
    console.log('server is up on the ' + port)
})

