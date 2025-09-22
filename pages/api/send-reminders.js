import clientPromise from "../../utils/mongoClient";
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Create admin Supabase client for user fetching
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    console.log('🔔 Cron job started at:', new Date().toISOString());
    
    try {
        const client = await clientPromise;
        const db = client.db('quiet_hours_scheduler');
        const blocksCollection = db.collection('blocks');

        const now = new Date();
        const tenMinLater = new Date(now.getTime() + 10 * 60 * 1000);

        console.log('⏰ Current time:', now.toISOString());
        console.log('🎯 Looking for blocks starting at:', tenMinLater.toISOString());

        // Fetch all blocks that are not notified
        const blocks = await blocksCollection.find({ notified: { $ne: true } }).toArray();
        console.log(`📚 Found ${blocks.length} unnotified blocks`);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let sentCount = 0;

        for (const block of blocks) {
            // Convert start_time string to Date object for today
            const [hour, minute] = block.start_time.split(':').map(Number);
            const blockStart = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                hour,
                minute
            );

            // Check if current time is 10 minutes before the block
            if (blockStart.getTime() >= tenMinLater.getTime() && blockStart.getTime() < tenMinLater.getTime() + 60 * 1000) {

                // Fetch user email from Supabase Auth
                const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(block.user_id);

                if (error || !user || !user.email) {
                    console.error(`Could not find email for user ${block.user_id}:`, error);
                    continue;
                }

                // Send email
                try {
                    await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: user.email,
                        subject: 'Quiet Hour Reminder',
                        text: `Your quiet hour "${block.title}" starts at ${blockStart.toLocaleTimeString()}`
                    });

                    // Mark as notified
                    await blocksCollection.updateOne(
                        { _id: block._id },
                        { $set: { notified: true } }
                    );

                    sentCount++;
                    console.log(`Reminder sent to ${user.email} for block "${block.title}"`);
                } catch (emailError) {
                    console.error(`Failed to send email to ${user.email}:`, emailError);
                }
            }
        }

        console.log(`✅ Cron job completed. Sent ${sentCount} reminders.`);
        res.status(200).json({ 
            success: true,
            sent: sentCount,
            timestamp: new Date().toISOString(),
            totalBlocks: blocks.length
        });

    } catch (err) {
        console.error('❌ Cron job error:', err);
        res.status(500).json({ 
            success: false,
            error: err.message,
            timestamp: new Date().toISOString()
        });
    }
}
