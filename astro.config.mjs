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
    `CREATE TABLE IF NOT EXISTS contacto (
    contacto_id INTEGER PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(100),
    puesto VARCHAR(255),
    comentarios VARCHAR(255),
    fecha_creacion DATETIME NOT NULL,
    fecha_actualizacion DATETIME
);`,
    `CREATE TABLE IF NOT EXISTS empresa (
    empresa_id INTEGER PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    nombre_oficial VARCHAR(255),
    direccion VARCHAR(255),
    cif VARCHAR(20),
    sitio_web VARCHAR(255),
    sector VARCHAR(255),
    tecnologias VARCHAR(255),
    comentarios VARCHAR(255),
    fecha_creacion DATETIME NOT NULL,
    fecha_actualizacion DATETIME,
    activo BOOLEAN NOT NULL,
    contacto_id INT,
    FOREIGN KEY (contacto_id) REFERENCES contacto (contacto_id) ON DELETE RESTRICT
);`,
    `CREATE TABLE IF NOT EXISTS interaccion (
    interaccion_id INTEGER PRIMARY KEY,
    fecha DATETIME NOT NULL,
    tipo VARCHAR(255),
    comentarios VARCHAR(255),
    objetivo VARCHAR(255),
    resultado VARCHAR(255),
    contacto_id INT NOT NULL,
    empresa_id INT,
    FOREIGN KEY (contacto_id) REFERENCES contacto (contacto_id) ON DELETE RESTRICT,
    FOREIGN KEY (empresa_id) REFERENCES empresa (empresa_id) ON DELETE RESTRICT
);`,
    `CREATE TABLE IF NOT EXISTS instituto (
    instituto_id INTEGER PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    direccion VARCHAR(255),
    sitio_web VARCHAR(255),
    telefono VARCHAR(20),
    comentarios VARCHAR(255),
    fecha_creacion DATETIME NOT NULL,
    fecha_actualizacion DATETIME
);`,
    `CREATE TABLE IF NOT EXISTS grupo (
    grupo_id INTEGER PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    curso VARCHAR(255),
    comentarios VARCHAR(255),
    fecha_creacion DATETIME NOT NULL,
    fecha_actualizacion DATETIME
);
`,
    `CREATE TABLE IF NOT EXISTS alumno (
    alumno_id INTEGER PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255),
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    email VARCHAR(100),
    nif VARCHAR(20),
    nia VARCHAR(20),
    nuss VARCHAR(50),
    comentarios VARCHAR(255),
    fecha_creacion DATETIME NOT NULL,
    fecha_actualizacion DATETIME,
    activo BOOLEAN NOT NULL,
    grupo_id INT NOT NULL,
    instituto_id INT NOT NULL,
    FOREIGN KEY (grupo_id) REFERENCES grupo (grupo_id) ON DELETE RESTRICT,
    FOREIGN KEY (instituto_id) REFERENCES instituto (instituto_id) ON DELETE RESTRICT
);`,
    `CREATE TABLE IF NOT EXISTS profesor (
    profesor_id INTEGER PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(100),
    nif VARCHAR(20),
    nip VARCHAR(20),
    comentarios VARCHAR(255),
    fecha_creacion DATETIME NOT NULL,
    fecha_actualizacion DATETIME,
    grupo_id INT,
    instituto_id INT,
    usuario_id INT NOT NULL,
    FOREIGN KEY (grupo_id) REFERENCES grupo (grupo_id) ON DELETE RESTRICT,
    FOREIGN KEY (instituto_id) REFERENCES instituto (instituto_id) ON DELETE RESTRICT
);`, `CREATE TABLE IF NOT EXISTS pro_alu_emp (
    pro_alu_emp_id INTEGER PRIMARY KEY,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    estado VARCHAR(255),
    curso VARCHAR(255),
    tutor_emp VARCHAR(255),
    comentarios VARCHAR(255),
    instituto_id INT NOT NULL,
    grupo_id INT NOT NULL,
    profesor_id INT NOT NULL,
    alumno_id INT NOT NULL,
    empresa_id INT NOT NULL,
    FOREIGN KEY (profesor_id) REFERENCES profesor (profesor_id) ON DELETE RESTRICT,
    FOREIGN KEY (alumno_id) REFERENCES alumno (alumno_id) ON DELETE RESTRICT,
    FOREIGN KEY (empresa_id) REFERENCES empresa (empresa_id) ON DELETE RESTRICT
);`, `CREATE TABLE IF NOT EXISTS usuario (
    usuario_id INTEGER PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(10) NOT NULL,
    activo BOOLEAN NOT NULL
);`
];

for (const query of queries)
{
    await tursodb.execute(query);
}

// https://astro.build/config

log('Server and DB ready');