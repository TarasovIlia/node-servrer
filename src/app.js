const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || config.get('port')
const HOST = config.get('host')
const MONGO_DB = config.get('mongoUrl')
const localhost = post => post ? `${HOST}${PORT}/${post}` : `${HOST}${PORT}`

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/question', require('./routes/delete.question'))
app.use('/api/question', require('./routes/get.question'))
app.use('/api/question', require('./routes/get.topic'))
app.use('/api/question', require('./routes/new.question'))
app.use('/api/question', require('./routes/new.topic'))


async function start() {
    try {
        await mongoose.connect(MONGO_DB, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
         })
        app.listen(PORT, () => console.log `App has been started at ${localhost()}`)
    } catch (err) {
        console.log(err.message)
    }
}

start()