import db from "@/lib/db";
import Task from "@/models/Task";

export async function GET(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const task = await Task.findById(id)

        return new Response(JSON.stringify(task), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}