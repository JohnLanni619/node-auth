import './env.js';
import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './db.js';

// ESM specific features
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = fastify();
const PORT = 7777;

async function startApp() {
    try {
        app.register(fastifyStatic, {
            root: path.join(__dirname, "public")
        })

        app.get('/test', {}, (request, reply) => {
            reply.send({
                data: {
                    John: {
                        name: "John",
                        age: 28,
                        occupation: "Web Dev"
                    },
                    Jace: {
                        name: "Jace",
                        age: 4,
                        occupation: "Toddie"
                    }
                }
            })
        })

        await app.listen(PORT)
        console.log(`Server Listening at port: ${PORT}`)
    } catch(e) {
        console.error('error:', e);
    }
}

connectDb().then( () => {
    startApp()
})