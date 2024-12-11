import { formatDate } from "../funcs.js";

import {
    tursodb
}
    from "@r/astro.config.mjs";

export async function GET() {
    return new Response(
        `Api to modify information of an highschool.`
    );
}

export async function POST(
    {
        request
    }) {
    const data = await request.json();

    if (!data.nombre) {
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

    try {
        let resp = await tursodb.execute(
            {
                sql: `UPDATE instituto 
                SET nombre = $nombre, descripcion = $descripcion, direccion = $direccion, sitio_web = $sitio_web, telefono = $telefono, comentarios = $comentarios, fecha_actualizacion = $fecha_actualizacion
                WHERE instituto_id = $instituto_id`,
                args:
                {
                    instituto_id: data.instituto_id,
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    direccion: data.direccion,
                    sitio_web: data.sitio_web,
                    telefono: data.telefono,
                    comentarios: data.comentarios,
                    fecha_actualizacion: formatDate(new Date())
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
    catch (error) {
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