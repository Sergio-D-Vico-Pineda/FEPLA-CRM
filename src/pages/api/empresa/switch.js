import
{
    tursodb
}
from "@r/astro.config.mjs";

export async function GET()
{
    return new Response(
        `Api to switch on/off a company.`
    );
}

export async function POST(
{
    request
})
{
    const data = await request.json();

    let resp = await tursodb.execute(
    {
        sql: `UPDATE empresa SET activo = $activo WHERE empresa_id = $empresa_id;`,
        args:
        {
            empresa_id: data.empresa_id,
            activo: data.activo
        }
    });
    return new Response(JSON.stringify(
    {
        message: data.activo ? "Empresa activada." : "Empresa desactivada."
    }),
    {
        status: 200,
        headers:
        {
            "Content-Type": "application/json",
        },
    });
}