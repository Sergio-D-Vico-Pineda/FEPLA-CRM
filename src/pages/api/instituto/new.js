import { formatDate } from "../funcs.js";

import {
    tursodb
}
    from "@r/astro.config.mjs";

export async function GET() {
    return new Response(
        `Api to add a new highschool.`
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
                sql: `INSERT INTO instituto(nombre, descripcion, direccion, sitio_web, telefono, comentarios, fecha_creacion)
        VALUES($nombre, $descripcion, $direccion, $sitio_web, $telefono, $comentarios, $fecha_creacion);`,

                args:
                {
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    direccion: data.direccion,
                    sitio_web: data.sitio_web,
                    telefono: data.telefono,
                    comentarios: data.comentarios,
                    fecha_creacion: formatDate(new Date())
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
    catch (error) {
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