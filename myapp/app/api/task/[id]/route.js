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

export async function DELETE(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const blog = await Task.findById(id)

        await Task.findByIdAndDelete(id)

        return new Response(JSON.stringify({msg: 'Successfully'}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 }) 
    }
}

export async function PUT(req, ctx) {
    await db.connect()

    const id = ctx.params.id


    try {
        const body = await req.json()
        const task = await Task.findById(id)


        const updatedTask = await Task.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })

        return new Response(JSON.stringify(updatedTask), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}