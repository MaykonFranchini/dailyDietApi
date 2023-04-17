import fastify from 'fastify'
import { appRoutes } from './http/routes'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)
app.register(appRoutes)
