import mongo from "mongodb";

const { MongoClient } = mongo;

const url = process.env.MONGO_URL

export const client = new MongoClient(url, { useNewUrlParser: true })

export async function connectDb() {
    try {
        await client.connect()
        // confirm connection
        await client.db("admin").command({ ping: 1 })
        console.log("Connected to DB Success!!!")
    } catch(e) {
        console.error(e)
        // If there's a problem, close connection to db
        await client.close()
    }
}
