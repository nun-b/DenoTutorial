export default (ctx: any) => {
    ctx.response.status = 404
    ctx.response.body = {
        success: false,
        msg: "Not Found"
    }
}
