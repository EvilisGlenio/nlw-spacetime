import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(cors, {
  origin: true, // todas URLs de front-end poderão acessar nosso back-end (este recurso geralmente é usado apenas em ambiente de desenvolvimento)
})
app.register(jwt, {
  secret: 'spacetime',
})

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

// HTTP Method: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
// GET: para quando quero LISTAR alguma coisa.
// POST: pra quando quero CRIAR alguma coisa.
// PUT: para quando eu quiser ATUALIZAR alguma coisa.
// PATCH: para quando eu quiser atualizar uma coisa ESPECIFICA dentro de um recuso

// API RESTful

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
