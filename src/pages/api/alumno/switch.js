import {
tursodb
}
    from "@r/astro.config.mjs";

export async function GET() {
    return new Response(
        `Api to switch on/off a student.`
    );
}

export async function POST(
    {
        request
    }) {
    const data = await request.json();

    let resp = await tursodb.execute(
        {
            sql: `UPDATE alumno SET activo = $activo WHERE alumno_id = $alumno_id;`,
            args:
            {
                alumno_id: data.alumno_id,
                activo: data.activo
            }
        });
    return new Response(JSON.stringify(
        {
            message: data.activo ? "Alumno activado." : "Alumno desactivado."
        }),
        {
            status: 200,
            headers:
            {
                "Content-Type": "application/json",
            },
        });
}