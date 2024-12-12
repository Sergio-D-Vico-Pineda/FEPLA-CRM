import { formatDate } from "../funcs.js";

import {
    tursodb
}
    from "@r/astro.config.mjs";

export async function GET() {
    return new Response(
        `Api to add a new internship.`
    );
}

export async function POST(
    {
        request
    }) {
    const data = await request.json();

    if (!data.alumno_id || !data.empresa_id || !data.profesor_id) {
        return new Response(JSON.stringify(
            {
                message: "SERVER: Error al recibir los datos. Faltan datos- Alumno, Empresa y Profesor."
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
                sql: `INSERT INTO pro_alu_emp(
                    fecha_inicio, fecha_fin, estado, curso, tutor_emp, comentarios, instituto_id, grupo_id, profesor_id, alumno_id, empresa_id
                ) VALUES(
                    $fecha_inicio, $fecha_fin, $estado, $curso, $tutor_emp, $comentarios, $instituto_id, $grupo_id, $profesor_id, $alumno_id, $empresa_id
                );`,
                args: {
                    fecha_inicio: data.fecha_inicio,
                    fecha_fin: data.fecha_fin,
                    estado: data.estado,
                    curso: data.curso,
                    tutor_emp: data.tutor_emp,
                    comentarios: data.comentarios,
                    instituto_id: data.instituto_id,
                    grupo_id: data.grupo_id,
                    profesor_id: data.profesor_id,
                    alumno_id: data.alumno_id,
                    empresa_id: data.empresa_id
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