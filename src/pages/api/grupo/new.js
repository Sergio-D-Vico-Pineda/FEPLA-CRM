import { formatDate } from "../funcs.js";

import
{
    tursodb
}
from "@r/astro.config.mjs";

export async function GET()
{
    return new Response(
        `Api to add a new group.`
    );
}

export async function POST(
{
    request
})
{
    const data = await request.json();

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
            sql: `INSERT INTO alumno(nombre, apellidos, telefono, fecha_nacimiento, email, nif, nia, nuss, comentarios, fecha_creacion, activo, grupo_id, instituto_id)
        VALUES($nombre, $apellidos, $telefono, $fecha_nacimiento, $email, $nif, $nia, $nuss, $comentarios, $fecha_creacion, $activo, $grupo_id, $instituto_id);`,

            args:
            {
                nombre: data.nombre,
                apellidos: data.apellidos,
                telefono: data.telefono,
                fecha_nacimiento: data.fecha_nacimiento,
                email: data.email,
                nif: data.nif,
                nia: data.nia,
                nuss: data.nuss,
                comentarios: data.comentarios,
                fecha_creacion: formatDate(new Date()),
                activo: 1,
                grupo_id: data.grupo_id,
                instituto_id: data.instituto_id
            }
        });

        console.log(resp);

        return new Response(JSON.stringify(
        {
            message: `SERVER: Datos recibidos correctamente. ${resp.rowsAffected}`
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
        return new Response(JSON.stringify(
        {
            message: `SERVER: Error al recibir los datos. ${error}`
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