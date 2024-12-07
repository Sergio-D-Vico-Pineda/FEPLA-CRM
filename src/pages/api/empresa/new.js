import { formatDate } from "../funcs.js";

import
{
    tursodb
}
from "@r/astro.config.mjs";

export async function GET()
{
    return new Response(
        `Api to add a new company.`
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
            sql: `INSERT INTO empresa(nombre, nombre_oficial, direccion, cif, sitio_web, sector, tecnologias, comentarios, fecha_creacion, activo, activo)
        VALUES($nombre, $nombre_oficial, $direccion, $cif, $sitio_web, $sector, $tecnologias, $comentarios, $fecha_creacion, $activo, $activo);`,
            args:
            {
                nombre: data.nombre,
                nombre_oficial: data.nombre_oficial,
                direccion: data.direccion,
                cif: data.cif,
                sitio_web: data.sitio_web,
                sector: data.sector,
                tecnologias: data.tecnologias,
                comentarios: data.comentarios,
                fecha_creacion: formatDate(new Date()),
                activo: 1
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
            message: "SERVER: Error al recibir los datos."
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