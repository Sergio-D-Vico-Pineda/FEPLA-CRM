export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-11) por eso +1
    const day = String(date.getDate()).padStart(2, '0'); // Día del mes (1-31)

    const hours = String(date.getHours()).padStart(2, '0'); // Horas (0-23)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos (0-59)
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Segundos (0-59)

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}