const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const path = require('path')
const fileupload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Connect to database
connectDB()

// Route files
const lores = require('./routes/lores')
const maps = require('./routes/maps')
const documents = require('./routes/documents')
const folders = require('./routes/folders')
const workspaces = require('./routes/workspaces')
const auth = require('./routes/auth')
const user = require('./routes/user')

const app = express()

// Body parser
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

// Cookie Parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent cross-site scripting attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000,
})
app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// File uploading
app.use(fileupload())

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount routers
app.use('/api/v1/lore-collection', lores)
app.use('/api/v1/maps', maps)
app.use('/api/v1/documents', documents)
app.use('/api/v1/folders', folders)
app.use('/api/v1/workspaces', workspaces)
app.use('/api/v1/auth', auth)
app.use('/api/v1/user', user)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.brightBlue
      .bold,
  ),
)

// Handle unhandled promise rejections
process.on('unhadledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.italic)
  //Close server & exit process
  server.close(() => process.exit(1))
})
