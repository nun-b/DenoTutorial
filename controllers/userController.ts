import { User } from '../types/userType.ts'
import { dbPostgres } from '../configs/postgresDB.ts'
import { Client } from 'https://deno.land/x/postgres/mod.ts'

// Init Client
const table = 'users'
const client = new Client(dbPostgres)

export default {
    async index(ctx: any) {
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
    },
    async show(ctx: any) {
        try {
            await client.connect()
            const id: number = ctx.params.id
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
    },
    async store(ctx: any) {
        // {
        //     "name": "name4",
        //     "email": "name3@mail.com",
        //     "age": 24
        // }

        const body = await ctx.request.body().value

        if(!ctx.request.hasBody) {
            console.log('No Data')
        } else {
            try {
                await client.connect()
                const result = await client.queryObject(
                    `INSERT INTO ${table} (name, email, age) VALUES ('${body.name}', '${body.email}', ${body.age})`
                )
                ctx.response.status = 200
                ctx.response.body = {
                    success: true,
                    msg: 'ok'
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
    },
    update: async function (ctx: any) {
        try {
            await client.connect()
            const id: number = ctx.params.id
            const result = await client.queryObject(`SELECT * FROM ${table} WHERE id = ${id}`);

            if(result.rows.toString() === "") {
                ctx.response.status = 404
                ctx.response.body = {
                    success: false,
                    msg: `아이디에 해당하는 상품이 없습니다.`
                }
                return
            } else {
                const user: any = result.rows[0]
                const { name, email, age } = await ctx.request.body().value

                const update_name = name !== undefined ? name : user.name
                const update_email = email !== undefined ? email : user.email
                const update_age = age !== undefined ? age : user.age

                const result2 = await client.queryObject(`UPDATE ${table} SET name='${update_name}', email='${update_email}', age=${update_age} WHERE id=${id}`)

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
    },
    async destroy(ctx: any) {
        try {
            await client.connect()
            const id: number = ctx.params.id

            const result = await client.queryObject(`DELETE FROM ${table} WHERE id=${id}`)

            ctx.response.body = {
                success: true,
                data: result.rows
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
    },
}