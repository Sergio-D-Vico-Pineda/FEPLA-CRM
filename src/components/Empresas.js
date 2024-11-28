export const rows = Array.from(
{
    length: 9
}, (_, i = 0) =>
{
    return {
        empresa_id: i + 1,
        nombre: `Empresa ${i + 1}`,
        nombre_oficial: `Empresa oficial ${i + 1}`,
        direccion: `Calle ${i + 1}, 1, 46001 Valencia`,
        cif: `B12345678${i + 1}`,
        sitio_web: `https://empresa${i + 1}.es`,
        sector: `Sector ${i + 1}`,
        tecnologias: `tecnologia ${i + 1}`,
        comentarios: `comentarios ${i + 1}`,
    };
});