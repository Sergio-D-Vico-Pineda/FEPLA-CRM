import { formatDate } from "../funcs.js";

import
{
    tursodb
}
from "@r/astro.config.mjs";

export async function GET()
{
    return new Response(
        `Api to modify information of a company.`
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
            sql: `UPDATE empresa 
            SET nombre = $nombre, nombre_oficial = $nombre_oficial, direccion = $direccion, cif = $cif, sitio_web = $sitio_web, sector = $sector, tecnologias = $tecnologias, comentarios = $comentarios, fecha_actualizacion = $fecha_actualizacion
            WHERE empresa_id = $empresa_id`,
            args:
            {
                empresa_id: data.empresa_id,
                nombre: data.nombre,
                nombre_oficial: data.nombre_oficial,
                direccion: data.direccion,
                cif: data.cif,
                sitio_web: data.sitio_web,
                sector: data.sector,
                tecnologias: data.tecnologias,
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