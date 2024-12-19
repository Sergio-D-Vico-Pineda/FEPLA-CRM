import { formatDate, extractNumber } from "../funcs.js";

import {
    tursodb
}
    from "@r/astro.config.mjs";

export async function GET() {
    return new Response(
        `Api to add a new cpntact.`
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
                sql: `INSERT INTO contacto(nombre, apellidos, telefono, email, puesto, comentarios, fecha_creacion)
        VALUES($nombre, $apellidos, $telefono, $email, $puesto, $comentarios, $fecha_creacion);`,

                args:
                {
                    nombre: data.nombre,
                    apellidos: data.apellidos,
                    telefono: data.telefono,
                    email: data.email,
                    puesto: data.puesto,
                    comentarios: data.comentarios,
                    fecha_creacion: formatDate(new Date()),
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