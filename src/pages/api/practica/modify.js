import { formatDate } from "../funcs.js";

import {
    tursodb
}
    from "@r/astro.config.mjs";

export async function GET() {
    return new Response(
        `Api to modify information of an internship.`
    );
}

export async function POST(
    {
        request
    }) {
    const data = await request.json();
    console.log(data)

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

    const { rows: arows } = await tursodb.execute(
        {
            sql: `SELECT * FROM alumno WHERE alumno_id = $alumno_id;`,
            args: {
                alumno_id: data.alumno_id
            }
        }
    );

    try {
        let resp = await tursodb.execute(
            {
                sql: `UPDATE pro_alu_emp 
                        SET 
                            fecha_inicio = $fecha_inicio,
                            fecha_fin = $fecha_fin,
                            estado = $estado,
                            curso = $curso,
                            tutor_emp = $tutor_emp,
                            comentarios = $comentarios,
                            instituto_id = $instituto_id,
                            grupo_id = $grupo_id,
                            profesor_id = $profesor_id,
                            alumno_id = $alumno_id,
                            empresa_id = $empresa_id,
                            fecha_actualizacion = $fecha_actualizacion
                        WHERE 
                            pro_alu_emp_id = $pro_alu_emp_id;
                        `,
                args:
                {
                    fecha_inicio: data.fecha_inicio,
                    fecha_fin: data.fecha_fin,
                    estado: data.estado,
                    curso: data.curso,
                    tutor_emp: data.tutor_emp,
                    comentarios: data.comentarios,
                    instituto_id: arows[0].instituto_id, // from alumno
                    grupo_id: arows[0].grupo_id, // from alumno
                    profesor_id: data.profesor_id,
                    alumno_id: data.alumno_id,
                    empresa_id: data.empresa_id,
                    fecha_actualizacion: formatDate(new Date()),
                    pro_alu_emp_id: data.pro_alu_emp_id
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