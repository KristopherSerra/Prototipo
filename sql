CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(255)
);

CREATE TABLE asistencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    estado VARCHAR(20),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
