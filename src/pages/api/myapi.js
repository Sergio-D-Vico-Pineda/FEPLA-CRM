/* export const prerender = true; */

function formatDate(date)
{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-11) por eso +1
    const day = String(date.getDate()).padStart(2, '0'); // Día del mes (1-31)

    const hours = String(date.getHours()).padStart(2, '0'); // Horas (0-23)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos (0-59)
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Segundos (0-59)

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


import
{
    tursodb
}
from "../../../astro.config.mjs";

export async function GET()
{
    return new Response(
        JSON.stringify(
        {
            message: `This is my static endpoint`,
        }),
    );
}


export async function POST(
{
    request
})
{
    const data = await request.json();

    tursodb.execute(
    {
        sql: `INSERT INTO empresa(email_contacto, contacto_principal, telefono_contacto, disponibilidad, comentarios, fechaRegistro) VALUES($email, $cif, $nombre, $telefono, $disponibilidad, $comentarios, $fechaRegistro);`,
        args:
        {
            email: data.email,
            cif: data.cif,
            nombre: data.nombre,
            telefono: data.telefono,
            disponibilidad: data.disponibilidad,
            comentarios: data.comentarios,
            fechaRegistro: formatDate(new Date())
        }
    });


    return new Response(JSON.stringify(
    {
        message: "Datos recibidos correctamente",
        receivedData: data
    }),
    {
        status: 200,
        headers:
        {
            'Content-Type': 'application/json'
        }
    });
}