import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../../services/prisma'

export async function checkUserIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user_id = request.cookies.user_id

  if (!user_id) {
    return reply.status(401).send({
      error: 'Unanthorized.',
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })

  if (!user) {
    return reply.status(404).send({
      error: 'User not found.',
    })
  }
}
