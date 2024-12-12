import {
    tursodb
}
    from "@r/astro.config.mjs";

export async function GET() {
    return new Response(
        `Api to login into the page.`
    );
}

export async function POST(
    {
        request
    }) {
    const data = await request.json();

    let rows = tursodb.execute(
        {
            sql: `SELECT rol, usuario, usuario_id FROM usuario WHERE (email = $emailusuario OR usuario = $emailusuario) AND contrasena = $password;`,
            args:
            {
                emailusuario: data.emailusuario,
                password: data.password
            }
        });

    let rowvalue = (await rows).rows; // [ { rol: 'Prof', usuario: 'admin', usuario_id: 1 } ]

    if (rowvalue.length == 0) {
        return new Response(JSON.stringify(
            {
                message: "SERVER: Error de inicio de sesión."
            }),
            {
                status: 401,
                headers:
                {
                    'Content-Type': 'application/json'
                }
            });
    }
    let user_id = rowvalue[0].usuario_id

    let rows2 = tursodb.execute(
        {
            sql: `SELECT profesor_id FROM profesor WHERE usuario_id = $usuario_id;`,
            args:
            {
                usuario_id: user_id
            }
        });

    let rowvalue2 = (await rows2).rows; // [ { profesor_id: 1 } ]

    return new Response(JSON.stringify(
        {
            message: `SERVER: Inicio de sesión de ${rowvalue[0].rol}.`,
            user: rowvalue[0].usuario,
            rol: rowvalue[0].rol,
            profesor_id: rowvalue2[0]?.profesor_id || 0
        }),
        {
            status: 200,
            headers:
            {
                'Content-Type': 'application/json'
            }
        });
}