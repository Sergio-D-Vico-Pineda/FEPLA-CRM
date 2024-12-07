import { formatDate } from "../funcs.js";

import
{
    tursodb
}
from "../../../../astro.config.mjs";

export async function GET()
{
    return new Response(
        `Api to modify information of a group.`
    );
}

export async function POST(
{
    request
})
{
    const data = await request.json();
    console.log(data)

    if (!data.nombre)
    {
        return new Response(JSON.stringify(
        {
            message: "SERVER: Error al recibir los datos. Nombre vacio."
        }),
        {
            status: 500,
            headers:
            {
                'Content-Type': 'application/json'
            }
        });
    }

    try
    {
        let resp = await tursodb.execute(
        {
            sql: `UPDATE alumno 
                SET nombre = $nombre, apellidos = $apellidos, telefono = $telefono, fecha_nacimiento = $fecha_nacimiento, email = $email, nif = $nif, nia = $nia, nuss = $nuss, comentarios = $comentarios, fecha_actualizacion = $fecha_actualizacion
                WHERE alumno_id = $alumno_id`,
            args:
            {
                alumno_id: data.alumno_id,
                nombre: data.nombre,
                apellidos: data.apellidos,
                telefono: data.telefono,
                fecha_nacimiento: data.fecha_nacimiento,
                email: data.email,
                nif: data.nif,
                nia: data.nia,
                nuss: data.nuss,
                comentarios: data.comentarios,
                fecha_actualizacion: formatDate(new Date()),
            }

        });

        return new Response(JSON.stringify(
        {
            message: `SERVER: Datos actualizados correctamente. ${resp.rowsAffected}`
        }),
        {
            status: 200,
            headers:
            {
                'Content-Type': 'application/json'
            }
        });
    }
    catch (error)
    {
        console.log(error)
        return new Response(JSON.stringify(
        {
            message: "SERVER: Error al actualizar los datos."
        }),
        {
            status: 500,
            headers:
            {
                'Content-Type': 'application/json'
            }
        });
    }
}