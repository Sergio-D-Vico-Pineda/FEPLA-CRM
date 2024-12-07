import
{
    tursodb
}
from "@r/astro.config.mjs";

export async function GET()
{
    return new Response(
        `Api to login into the page.`
    );
}

export async function POST(
{
    request
})
{
    const data = await request.json();

    let rows = tursodb.execute(
    {
        sql: `SELECT rol, usuario FROM usuario WHERE (email = $emailusuario OR usuario = $emailusuario) AND contrasena = $password;`,
        args:
        {
            emailusuario: data.emailusuario,
            password: data.password
        }
    });

    let rowvalue = (await rows).rows; // [ { rol: 'Prof' } ]

    return new Response(JSON.stringify(
    {
        message: `SERVER: Inicio de sesión de ${rowvalue[0].rol}.`,
        user: rowvalue[0].usuario
    }),
    {
        status: 200,
        headers:
        {
            'Content-Type': 'application/json'
        }
    });
}