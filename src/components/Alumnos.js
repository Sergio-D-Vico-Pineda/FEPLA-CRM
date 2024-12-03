// alumno_id, nombre, apellidos, telefono, fecha_nacimiento, email, nif, nia, nuss, comentarios, fecha_creacion, fecha_actualizacion, activo, grupo_id, instituto_id
export const rows = Array.from(
{
    length: 9
}, (_, i = 0) =>
{
    return {
        alumno_id: i + 1,
        nombre: `Alumno ${i + 1}`,
        apellidos: `Apellidos ${i + 1}`,
        telefono: `6666666${i + 1}`,
        fecha_nacimiento: `2000-01-01`,
        email: `alumno${i + 1}@alumno.com`,
        nif: `B12345678${i + 1}`,
        nia: `B12345678${i + 1}`,
        nuss: `B12345678${i + 1}`,
        comentarios: `comentarios ${i + 1}`,
        fecha_creacion: `2000-01-01`,
        fecha_actualizacion: `2000-01-01`,
        activo: true
    };
});