// deno run --allow-net --allow-read AppPostgres.ts
import { dbPostgres } from '../configs/postgresDB.ts'
import { Client } from 'https://deno.land/x/postgres/mod.ts'

// Init Client
const table = 'users'
const client = new Client(dbPostgres)

const GetUser = async(ctx: any) => {
    try {
        await client.connect()
        const { id } : { id: number } = ctx.params
        const result = await client.queryObject(`SELECT * FROM ${table} WHERE id = ${id}`);

        if(result.rows.toString() === "") {
            ctx.response.status = 404
            ctx.response.body = {
                success: false,
                msg: `아이디에 해당하는 상품이 없습니다.`
            }
            return
        } else {
            ctx.response.body = {
                success: true,
                data: result.rows
            }
            return result.rows

        }
    } catch (err) {
        ctx.response.status = 500
        ctx.response.body = {
            success: false,
            msg: err.toString()
        }
    } finally {
        await client.end();
    }
}

const GetUsers = async(ctx: any) => {
    try {
        await client.connect()
        const result = await client.queryObject(`SELECT * FROM ${table}`)

        ctx.response.body = {
            success: true,
            data: result.rows
        }

        // {
        //     "success": true,
        //     "data": [
        //         {
        //             "id": 1,
        //             "name": "name1",
        //             "email": "name1@mail.com",
        //             "age": 21
        //         },
        //         {
        //             "id": 2,
        //             "name": "name2",
        //             "email": "name2@email.com",
        //             "age": 22
        //         }
        //     ]
        // }
    } catch (err) {
        ctx.response.status = 500
        ctx.response.body = {
            success: false,
            msg: err.toString()
        }
    } finally {
        await client.end();
    }
}

const PostUser = async(ctx: any) => {
    // {
    //     "name": "name4",
    //     "email": "name4@mail.com",
    //     "age": 24
    // }
    const { name, email, age}: { name:string, email: string, age:number }
        = await ctx.request.body().value

    if(!ctx.request.hasBody) {
        console.log('No Data')
    } else {
        try {
            await client.connect()
            const result = await client.queryObject(
                `INSERT INTO ${table} (name, email, age) VALUES ('${name}', '${email}', ${age})`
            )
            ctx.response.status = 200
            ctx.response.body = {
                success: true,
                msg: result.rows
            }
        } catch (err) {
            ctx.response.status = 500
            ctx.response.body = {
                success: false,
                msg: err.toString()
            }
        } finally {
            await client.end();
        }
    }


}

const UpdateUser = async(ctx: any) => {
    try {
        const result: any = await GetUser(ctx)

        if(result === undefined){
            console.log('데이터가 존재하지 않음')
        } else {
            const id = ctx.params.id
            const { name, email, age }: { name:string, email: string, age:number } = await ctx.request.body().value

            const update_name = name !== undefined ? name : result[0].name
            const update_email = email !== undefined ? email : result[0].email
            const update_age = age !== undefined ? age : result[0].age

            await client.connect()
            const result2 = await client.queryObject(
                `UPDATE ${table} SET name='${update_name}', email='${update_email}', age=${update_age} WHERE id=${id}`
            )
            ctx.response.body = {
                success: true,
                data: result2.rows
            }
        }
    } catch (err) {
        ctx.response.status = 500
        ctx.response.body = {
            success: false,
            msg: err.toString()
        }
    } finally {
        await client.end();
    }
}

const DeleteUser = async(ctx: any) => {
    try {
        const result: any = await GetUser(ctx)

        if(result === undefined){
            console.log('데이터가 존재하지 않음')
        } else {
            await client.connect()
            const id: number = ctx.params.id

            const results = await client.queryObject(`DELETE FROM ${table} WHERE id=${id}`)

            ctx.response.body = {
                success: true,
                data: results.rows
            }
        }
    } catch (err) {
        ctx.response.status = 500
        ctx.response.body = {
            success: false,
            msg: err.toString()
        }
    } finally {
        await client.end();
    }
}

export { GetUser, GetUsers, PostUser, UpdateUser, DeleteUser }