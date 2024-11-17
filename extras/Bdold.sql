-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS CRM_Practicas;

USE CRM_Practicas;

-- Tabla USUARIO
CREATE TABLE USUARIO (
    UsuarioId INT AUTO_INCREMENT PRIMARY KEY,
    Usuario VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
    Rol ENUM('Prof', 'Admin') NOT NULL,
    Activo BOOLEAN NOT NULL
);

-- Tabla INSTITUTO
CREATE TABLE INSTITUTO (
    InstitutoId INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Direccion VARCHAR(255),
    SitioWeb VARCHAR(255),
    Telefono VARCHAR(255),
    Comentarios TEXT,
    FechaCreacion DATETIME NOT NULL,
    FechaActualizacion DATETIME
);

-- Tabla GRUPO
CREATE TABLE GRUPO (
    GrupoId INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Curso VARCHAR(255),
    Comentarios TEXT,
    FechaCreacion DATETIME NOT NULL,
    FechaActualizacion DATETIME
);

-- Tabla PROFESOR
CREATE TABLE PROFESOR (
    ProfesorId INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Apellidos VARCHAR(255),
    Telefono VARCHAR(255),
    Email VARCHAR(255) NOT NULL,
    NIF VARCHAR(255),
    NIP VARCHAR(255),
    Comentarios TEXT,
    FechaCreacion DATETIME NOT NULL,
    FechaActualizacion DATETIME,
    GrupoId INT,
    InstitutoId INT,
    UsuarioId INT UNIQUE, -- Relación 1 a 1 con USUARIO
    FOREIGN KEY (GrupoId) REFERENCES GRUPO (GrupoId) ON DELETE RESTRICT,
    FOREIGN KEY (InstitutoId) REFERENCES INSTITUTO (InstitutoId) ON DELETE RESTRICT,
    FOREIGN KEY (UsuarioId) REFERENCES USUARIO (UsuarioId) ON DELETE RESTRICT
);

-- Tabla ALUMNO
CREATE TABLE ALUMNO (
    AlumnoId INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Apellidos VARCHAR(255),
    Telefono VARCHAR(255),
    FechaNacimiento DATETIME,
    Email VARCHAR(255),
    NIF VARCHAR(255),
    NIA VARCHAR(255),
    NUSS VARCHAR(255),
    Comentarios TEXT,
    FechaCreacion DATETIME NOT NULL,
    FechaActualizacion DATETIME,
    Activo BOOLEAN NOT NULL,
    GrupoId INT,
    InstitutoId INT,
    FOREIGN KEY (GrupoId) REFERENCES GRUPO (GrupoId) ON DELETE RESTRICT,
    FOREIGN KEY (InstitutoId) REFERENCES INSTITUTO (InstitutoId) ON DELETE RESTRICT
);

-- Tabla EMPRESA
CREATE TABLE EMPRESA (
    EmpresaId INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    NombreOficial VARCHAR(255),
    Direccion VARCHAR(255),
    CIF VARCHAR(255),
    SitioWeb VARCHAR(255),
    Sector VARCHAR(255),
    Tecnologias TEXT,
    Comentarios TEXT,
    FechaCreacion DATETIME NOT NULL,
    FechaActualizacion DATETIME,
    ContactoId INT,
    FOREIGN KEY (ContactoId) REFERENCES CONTACTO (ContactoId) ON DELETE RESTRICT
);

-- Tabla CONTACTO
CREATE TABLE CONTACTO (
    ContactoId INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Apellidos VARCHAR(255),
    Telefono VARCHAR(255),
    Email VARCHAR(255),
    Puesto VARCHAR(255),
    Comentarios TEXT,
    FechaCreacion DATETIME NOT NULL,
    FechaActualizacion DATETIME
);

-- Tabla PRO-ALU-EMP
CREATE TABLE `PRO-ALU-EMP` (
    ProAluEmpId INT AUTO_INCREMENT PRIMARY KEY,
    FechaInicio DATETIME NOT NULL,
    FechaFin DATETIME,
    Estado VARCHAR(255) NOT NULL,
    Curso VARCHAR(255) NOT NULL,
    TutorEmp VARCHAR(255),
    Comentarios TEXT,
    ProfesorId INT,
    AlumnoId INT,
    EmpresaId INT,
    InstitutoId INT,
    GrupoId INT,
    FOREIGN KEY (ProfesorId) REFERENCES PROFESOR (ProfesorId) ON DELETE RESTRICT,
    FOREIGN KEY (AlumnoId) REFERENCES ALUMNO (AlumnoId) ON DELETE RESTRICT,
    FOREIGN KEY (EmpresaId) REFERENCES EMPRESA (EmpresaId) ON DELETE RESTRICT,
    FOREIGN KEY (InstitutoId) REFERENCES INSTITUTO (InstitutoId) ON DELETE RESTRICT,
    FOREIGN KEY (GrupoId) REFERENCES GRUPO (GrupoId) ON DELETE RESTRICT
);

-- Tabla INTERACCION
CREATE TABLE INTERACCION (
    InteraccionId INT AUTO_INCREMENT PRIMARY KEY,
    Fecha DATETIME NOT NULL,
    Tipo VARCHAR(255),
    Comentarios TEXT,
    Objetivo TEXT,
    Resultado TEXT,
    ContactoId INT,
    EmpresaId INT,
    FOREIGN KEY (ContactoId) REFERENCES CONTACTO (ContactoId) ON DELETE RESTRICT,
    FOREIGN KEY (EmpresaId) REFERENCES EMPRESA (EmpresaId) ON DELETE RESTRICT
);