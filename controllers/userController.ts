// import { User } from '../types/userType'
import { dbPostgres } from '../configs/postgresDB.ts'
import { Client } from 'https://deno.land/x/postgres/mod.ts'

// Init Client
const client = new Client(dbPostgres)

export default {
    async index(ctx: any) {
        try {
            await client.connect()
            const result = await client.queryObject('SELECT * FROM users')

            ctx.response.body = {
                success: true,
                data: result
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
    async show(ctx: any) {
        try {

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
        try {

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
    async update(ctx: any) {
        try {

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