import { formatDate } from "../funcs.js";

import {
    tursodb
}
    from "@r/astro.config.mjs";

export async function GET() {
    return new Response(
        `Api to add a new professor.`
    );
}

export async function POST(
    {
        request
    }) {
    const data = await request.json();

    if (!data.nombre || !data.email || !data.contrasena || !data.usuario) {
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

    let transaction;
    try {
        transaction = await tursodb.transaction("write");

        const resp1 = await transaction.execute({
            sql: `INSERT INTO usuario (usuario, email, contrasena, rol, activo) 
            VALUES ($usuario, $email, $contrasena, $rol, $activo);`,
            args: {
                usuario: data.usuario,
                email: data.email,
                contrasena: data.contrasena,
                rol: "Prof",
                activo: 1,
            },
        });

        const resp2 = await transaction.execute({
            sql: `INSERT INTO profesor (nombre, apellidos, telefono, email, nif, nip, comentarios, fecha_creacion, usuario_id)
            VALUES ($nombre, $apellidos, $telefono, $email, $nif, $nip, $comentarios, $fecha_creacion, $usuario_id);`,
            args: {
                nombre: data.nombre,
                apellidos: data.apellidos,
                telefono: data.telefono,
                email: data.email,
                nif: data.nif,
                nip: data.nip,
                comentarios: data.comentarios,
                fecha_creacion: formatDate(new Date()),
                usuario_id: resp1.lastInsertRowid.toString(),
            },
        });

        await transaction.commit();
        return new Response(JSON.stringify(
            {
                message: `SERVER: Datos recibidos correctamente. ${resp2.rowsAffected}`
            }),
            {
                status: 200,
                headers:
                {
                    'Content-Type': 'application/json'
                }
            });

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        return new Response(JSON.stringify(
            {
                message: "SERVER: Error al procesoar los datos."
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