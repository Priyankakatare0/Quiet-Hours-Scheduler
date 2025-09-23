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
            // Convert start_time string to Date object for today in IST
            const [hour, minute] = block.start_time.split(':').map(Number);
            
            // Create block time in IST timezone
            const istDate = new Date();
            istDate.setUTCHours(hour - 5, minute - 30, 0, 0); // Convert IST to UTC (IST = UTC+5:30)
            
            // If the time has passed today, it means it's for tomorrow
            if (istDate.getTime() < now.getTime()) {
                istDate.setUTCDate(istDate.getUTCDate() + 1);
            }

            // Check if block starts between 8-12 minutes from now (wider window)
            const timeDiffMinutes = Math.round((istDate.getTime() - now.getTime()) / (60 * 1000));
            
            console.log(`🔍 Block "${block.title}" - Current UTC: ${now.toISOString()}, Block IST time as UTC: ${istDate.toISOString()}, Diff: ${timeDiffMinutes} minutes`);
            
            if (timeDiffMinutes >= 8 && timeDiffMinutes <= 12) {
                console.log(`🎯 Found matching block: "${block.title}" starting in ${timeDiffMinutes} minutes`);

                // Fetch user email from Supabase Auth
                const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(block.user_id);

                if (error || !user || !user.email) {
                    console.error(`❌ Could not find email for user ${block.user_id}:`, error);
                    continue;
                }

                console.log(`📧 Attempting to send email to ${user.email} for block "${block.title}"`);

                // Send email
                try {
                    const emailResult = await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: user.email,
                       subject: '🌙 Quiet Hour Reminder',
                       html: `
                          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                            <h2 style="color: #4a90e2;">🌙 Quiet Hour Reminder</h2>
                            <p>Hello!</p>
                            <p>Your scheduled <strong>Quiet Hour</strong> "<strong>${block.title}</strong>" is about to begin at <strong>${block.start_time} IST</strong>, just <strong>${timeDiffMinutes} minutes</strong> from now.</p>
                            <p>Take a moment to prepare and enjoy your focused time! ✨</p>
                            <hr style="border: none; border-top: 1px solid #eee;" />
                            <p style="font-size: 0.9em; color: #777;">– The Quiet Hours Scheduler Team</p>
                          </div>
`


                    console.log(`📨 Email sent successfully. Message ID: ${emailResult.messageId}`);

                    // Mark as notified
                    await blocksCollection.updateOne(
                        { _id: block._id },
                        { $set: { notified: true } }
                    );

                    sentCount++;
                    console.log(`✅ Reminder sent to ${user.email} for block "${block.title}"`);
                } catch (emailError) {
                    console.error(`❌ Failed to send email to ${user.email}:`, emailError.message);
                    console.error(`❌ Email error details:`, emailError);
                }
            } else {
                console.log(`⏭️ Block "${block.title}" starts in ${timeDiffMinutes} minutes (outside 8-12 min window)`);
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
