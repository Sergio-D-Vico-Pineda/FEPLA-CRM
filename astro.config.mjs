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

const queries = [
    `CREATE TABLE IF NOT EXISTS EMPRESA (
    empresa_id INT PRIMARY KEY,
    nombre VARCHAR(100),
    contacto_principal VARCHAR(100),
    telefono_contacto VARCHAR(15),
    email_contacto VARCHAR(100),
    direccion VARCHAR(255),
    sector VARCHAR(50)
);`,
    `CREATE TABLE IF NOT EXISTS ALUMNO (
    alumno_id INT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(15),
    grupo_id INT,
    empresa_id INT,
    fecha_inicio_practicas DATE,
    fecha_fin_practicas DATE,
    estado VARCHAR(50),
    FOREIGN KEY (grupo_id) REFERENCES GRUPO(grupo_id),
    FOREIGN KEY (empresa_id) REFERENCES EMPRESA(empresa_id)
);`,

    `CREATE TABLE IF NOT EXISTS PROFESOR (
    profesor_id INT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(15),
    departamento VARCHAR(50),
    es_coordinador BOOLEAN
);`,

    `CREATE TABLE IF NOT EXISTS GRUPO (
    grupo_id INT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(255),
    profesor_id INT,
    FOREIGN KEY (profesor_id) REFERENCES PROFESOR(profesor_id)
);`,
    `CREATE TABLE IF NOT EXISTS RELACIONES_PROFESORES_GRUPOS (
    relacion_id INT PRIMARY KEY,
    profesor_id INT,
    grupo_id INT,
    FOREIGN KEY (profesor_id) REFERENCES PROFESOR(profesor_id),
    FOREIGN KEY (grupo_id) REFERENCES GRUPO(grupo_id)
);`,
    `CREATE TABLE IF NOT EXISTS RELACIONES_PROFESORES_EMPRESAS (
    relacion_id INT PRIMARY KEY,
    profesor_id INT,
    empresa_id INT,
    FOREIGN KEY (profesor_id) REFERENCES PROFESOR(profesor_id),
    FOREIGN KEY (empresa_id) REFERENCES EMPRESA(empresa_id)
);`,
    `CREATE TABLE IF NOT EXISTS USUARIO (
    usuario_id INT PRIMARY KEY,
    profesor_id INT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    rol VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (profesor_id) REFERENCES PROFESOR(profesor_id)
);`

];

for (const query of queries)
{
    await tursodb.execute(query);
}

// https://astro.build/config

log('DB created')