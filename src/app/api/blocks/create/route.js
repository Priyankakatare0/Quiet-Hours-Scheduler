import { NextResponse } from "next/server";
import clientPromise from "../../../../../utils/mongoClient";

export async function POST(req) {
    try {
        const body = await req.json();
        const { user_id, title, start_time, end_time } = body;

        console.log('POST /api/blocks/create - data:', { user_id, title, start_time, end_time });

        if (!user_id || !title || !start_time || !end_time) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('quiet_hours_scheduler');
        const collection = db.collection('blocks');

        const result = await collection.insertOne({
            user_id,
            title,
            start_time,
            end_time,
            notified: false,
            created_at: new Date()
        });

        console.log('Block created with ID:', result.insertedId);
        return NextResponse.json(
            { message: 'Block created', id: result.insertedId },
            { status: 200 }
        );
    }
    catch (err) {
        console.error('API Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
    