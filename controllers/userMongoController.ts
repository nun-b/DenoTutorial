import { config } from "https://deno.land/x/dotenv/mod.ts"
import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.29.1/mod.ts";

const env = config()
const client = new MongoClient()
await client.connect(`mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASS}@${env.MONGO_CLUSTER_URL}/${env.MONGO_DB}?authMechanism=SCRAM-SHA-1`);

// Defining schema interface
interface UserSchema {
    _id: Bson.ObjectId;
    name: string;
    email: string;
    age: number;
    dates: Date;
}

const db = client.database('deno')
const usersCollection = db.collection<UserSchema>('users')

const GetUserMongo = async(ctx: any) => {
    const { id } : { id: number } = ctx.params
    const result = await usersCollection.findOne({
        _id: new Bson.ObjectId(id),
    });
    ctx.response.body = result
}

const GetUsersMongo = async(ctx: any) => {
    const result = await usersCollection.find()
    ctx.response.body = result
}

const PostUserMongo = async(ctx: any) => {
    const { name, email, age }: { name:string, email: string, age:number }
        = await ctx.request.body().value

    const dates: Date = new Date()
    const result = await usersCollection.insertOne({
        name, email, age, dates
    });

    ctx.response.status = 201
    ctx.response.body = result
}

const UpdateUserMongo = async(ctx: any) => {
    const { id } : { id: number } = ctx.params
    const { name, email, age }: { name:string, email: string, age:number }
        = await ctx.request.body().value

    const { modifiedCount } = await usersCollection.updateOne({_id: new Bson.ObjectId(id)},{
        $set: {
            name,
            email,
            age
        }
    })

    if(!modifiedCount) {
        ctx.response.status = 404
        ctx.response.body = ''
    } else {
        ctx.response.status = 201
        ctx.response.body = ''
    }

}
const DeleteUserMongo = async(ctx: any) => {
    const { id } : { id: number } = ctx.params
    const deleteCount = await usersCollection.deleteOne({ _id: new Bson.ObjectId(id)});
    // const deleteCount2 = await usersCollection.deleteMany({ username: "test" });

    ctx.response.body = deleteCount
}

export { GetUserMongo, GetUsersMongo, PostUserMongo, UpdateUserMongo, DeleteUserMongo }