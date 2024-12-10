import { formatDate } from "../funcs.js";

import {
    tursodb
}
    from "@r/astro.config.mjs";

export async function GET() {
    return new Response(
        `Api to modify information of a group.`
    );
}

export async function POST(
    {
        request
    }) {
    const data = await request.json();
    console.log(data)

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
                sql: `UPDATE grupo 
                SET nombre = $nombre, descripcion = $descripcion, curso = $curso, comentarios = $comentarios, fecha_actualizacion = $fecha_actualizacion
                WHERE grupo_id = $grupo_id`,
                args:
                {
                    grupo_id: data.grupo_id,
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    curso: data.curso,
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