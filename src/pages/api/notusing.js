import Layout from "../../layouts/Layout.astro";
import Header from "@comp/Header.astro";
import Footer from "@comp/Footer.astro";

import
{
    tursodb
}
from "@r/astro.config.mjs";

export async function GET(
{
    request
})
{
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || 'Guest';

    return new Response(
        `<h1>Hello ${name}!</h1>`,
        {
            status: 200,
            headers:
            {
                'Content-Type': 'text/html',
            },
        }
    );
}

// Optional POST handler
export async function POST(
{
    request
})
{
    const data = await request.json();
    console.log(data);
    return new Response(
        JSON.stringify(
        {
            message: `You sent: ${JSON.stringify(data)}`
        }),
        {
            status: 200,
            headers:
            {
                'Content-Type': 'application/json',
            },
        }
    );
}