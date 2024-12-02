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