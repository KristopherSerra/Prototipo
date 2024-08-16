<?php
// Definir el archivo donde se guardará la asistencia
$archivo = 'asistencia.txt';

// Obtener los datos enviados desde el cliente
$datos = json_decode(file_get_contents('php://input'), true);

// Verificar si hay datos
if ($datos) {
    // Intentar abrir el archivo para escribir
    if ($archivoAsistencia = fopen($archivo, 'a')) {
        // Escribir cada registro de asistencia en el archivo
        foreach ($datos as $registro) {
            $linea = $registro['nombre'] . ': ' . implode(', ', $registro['asistencia']) . PHP_EOL;
            fwrite($archivoAsistencia, $linea);
        }

        // Cerrar el archivo
        fclose($archivoAsistencia);
        echo 'Asistencia guardada exitosamente';
    } else {
        // Si no se puede abrir el archivo
        echo 'Error: No se pudo abrir el archivo para guardar la asistencia';
    }
} else {
    echo 'Error: No se recibieron datos';
}
?>
