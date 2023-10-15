import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import Task from '@/models/Task';
import { getAuth } from "@clerk/nextjs/server";


export async function POST(req) {
    await db.connect()

    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify("Unauthorized"), { status: 401 })
    }

    try {
        const body = await req.json()
        const newTask = await Task.create(body)

        return new Response(JSON.stringify(newTask), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}