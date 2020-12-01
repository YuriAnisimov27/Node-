const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')
const corsMiddleware = require('./middleware/cors.middleware')

const app = express()
const PORT = config.get('serverPort')

app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`)
    })
  } catch (e) {
    console.error('Server Error', e.message)
  }
}

start()
