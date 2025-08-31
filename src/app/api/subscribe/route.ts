import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, email } = await req.json();

        if (!firstName || !lastName || !email) {
            return NextResponse.json({ error: "Missing fields." }, { status: 400 });
        }

        const apiKey = process.env.MAILCHIMP_API_KEY!;
        const server = process.env.MAILCHIMP_SERVER_PREFIX!;
        const listId = process.env.MAILCHIMP_LIST_ID!;

        // Debug logging
        console.log('Environment check:');
        console.log('- API Key present:', !!apiKey);
        console.log('- Server prefix:', server);
        console.log('- List ID present:', !!listId);

        if (!apiKey || !server || !listId) {
            console.error('Missing environment variables');
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const subscriberHash = crypto
            .createHash("md5")
            .update(email.toLowerCase())
            .digest("hex");

        const url = `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`;
        console.log('- Full URL:', url);

        const requestBody = {
            email_address: email,
            status_if_new: "pending",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            },
            tags: ["Website Signup"],
        };

        console.log('Request body:', JSON.stringify(requestBody, null, 2));

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `apikey ${apiKey}`,
            },
            body: JSON.stringify(requestBody),
        });

        const data = await res.json();

        console.log('Mailchimp response status:', res.status);
        console.log('Mailchimp response data:', JSON.stringify(data, null, 2));

        if (!res.ok) {
            console.error('Mailchimp API error:', data);
            return NextResponse.json({
                error: data?.detail || data?.title || "Mailchimp error",
                mailchimpError: data
            }, { status: res.status });
        }

        return NextResponse.json({ ok: true, status: data.status });

    } catch (error) {
        console.error('Full error details:', error);
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

        return NextResponse.json({
            error: "Server error.",
            details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
        }, { status: 500 });
    }
}