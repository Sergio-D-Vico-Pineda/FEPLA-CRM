import
{
    defineConfig
}
from 'astro/config';
import
{
    createClient
}
from '@libsql/client/web';
import tailwind from '@astrojs/tailwind';
import dotenv from 'dotenv';

function log(text)
{
    console.log('SERVER: ' + text);
}

dotenv.config();

export default defineConfig(
{
    output: 'server',
    integrations: [tailwind()]
});

export const tursodb = createClient(
{
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
});

await tursodb.execute(`
  CREATE TABLE IF NOT EXISTS empresa (
  empresaId INTEGER PRIMARY KEY,
  nombre VARCHAR,
  email VARCHAR,
  cif VARCHAR,
  telefono VARCHAR,
  disponibilidad VARCHAR,
  comentarios VARCHAR,
  fechaRegistro TIMESTAMP
);`)

await tursodb.execute(`
  CREATE TABLE IF NOT EXISTS alumno (
  alumnoId INTEGER PRIMARY KEY,
  email VARCHAR,
  dni VARCHAR,
  nie VARCHAR,
  nombre VARCHAR,
  telefono VARCHAR,
  cursoActual VARCHAR,
  comentarios VARCHAR,
  fechaRegistro TIMESTAMP
);`)

// https://astro.build/config

log('DB created')