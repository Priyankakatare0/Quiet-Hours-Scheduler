import { NextResponse } from "next/server";
import clientPromise from "../../../../../utils/mongoClient";

export async function GET(req) {
    try {
        // For now, let's temporarily bypass auth and use user_id from query params
        // We'll add proper auth back once we verify the basic functionality works
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");

        console.log('GET /api/blocks/get - user_id:', user_id);

        if (!user_id) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('quiet_hours_scheduler');
        const collection = db.collection('blocks');

        // Filter by the provided user_id
        const blocks = await collection
            .find({ user_id })
            .sort({ created_at: -1 }) // Show newest first
            .toArray();

        console.log('Found blocks:', blocks.length);
        return NextResponse.json(blocks);
    }
    catch (err) {
        console.error('API Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}