import createError from 'http-errors'
import express, { ErrorRequestHandler, RequestHandler } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index'
import usersRouter from './routes/users'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (_request, _response, next) {
  next(createError(404))
} as RequestHandler)

// error handler
app.use(function (err, request, response) {
  // set locals, only providing error in development
  response.locals.message = err.message
  response.locals.error = request.app.get('env') === 'development' ? err : {}

  // render the error page
  response.status(err.status || 500)
  response.render('error')
} as ErrorRequestHandler)

export default app
