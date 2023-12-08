import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/cachorro', (request, reply) => {
// Acessando dados do corpo da requisição
    const {raca, dono, idade} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        raca: raca,
        dono: dono,
        idade: idade,
    })

    return reply.status(201).send
})

server.get('/cachorro', (request) => {
    const search = request.query.search
    console.log(search)
    const cachorros = database.list(search)
    console.log(cachorros)
    return cachorros
})

server.put('/cachorros/:id', (request, reply) => {
    const cachorroId = request.params.id
    const {raca, dono, idade} = request.body
    const cachorro = database.update(cachorroId, {
        raca: raca,
        dono: dono,
        idade: idade,
    })
    return reply.status(204).send()
})

server.delete('/cachorros/:id', (request, reply) => {
    const cachorroId = request.params.id

    database.delete(cachorroId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})