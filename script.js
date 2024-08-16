// Lista de 40 nombres al azar
const nombres = [
    'Manuel', 'María', 'Carlos', 'José', 'Lucía', 'Adriana', 'Patricia', 'Carmen', 
    'Sergio', 'Alejandro', 'Beatriz', 'Pilar', 'Clara', 'Alicia', 'Sara', 'Fernando', 
    'Isabel', 'Elena', 'Raúl', 'Roberto', 'Paula', 'Ana', 'Laura', 'Sofía', 'Juan', 
    'Cristina', 'Enrique', 'Eva', 'Marta', 'Francisco', 'Ricardo', 'Luis', 'Jorge', 
    'Daniel', 'Teresa', 'Pedro', 'Hugo', 'David', 'Andrés', 'Miguel'
];

// Referencia al cuerpo de la tabla
const attendanceTable = document.getElementById('attendanceTable');

// Generar las filas de la tabla dinámicamente
nombres.forEach((nombre, index) => {
    const row = document.createElement('tr');

    // Número de fila
    const cellNumber = document.createElement('td');
    cellNumber.textContent = index + 1;
    row.appendChild(cellNumber);

    // Nombre del estudiante
    const cellName = document.createElement('td');
    cellName.textContent = nombre;
    row.appendChild(cellName);

    // Crear 6 celdas vacías para cada día
    for (let i = 1; i <= 6; i++) {
        const cellDay = document.createElement('td');
        cellDay.setAttribute('id', `cell-${index}-${i}`);
        cellDay.setAttribute('data-dia', i);
        cellDay.textContent = '';  // Celda vacía
        row.appendChild(cellDay);
    }

    // Crear la celda de botones para marcar P o A
    const cellButtons = document.createElement('td');

    // Botón Presente
    const btnPresente = document.createElement('button');
    btnPresente.textContent = 'P';
    btnPresente.className = 'presente';
    btnPresente.onclick = () => marcarAsistencia(index, 'P');
    cellButtons.appendChild(btnPresente);

    // Botón Ausente
    const btnAusente = document.createElement('button');
    btnAusente.textContent = 'A';
    btnAusente.className = 'ausente';
    btnAusente.onclick = () => marcarAsistencia(index, 'A');
    cellButtons.appendChild(btnAusente);

    // Añadir la celda de botones P y A a la fila
    row.appendChild(cellButtons);

    // Crear la celda de botón para borrar
    const cellDeleteButton = document.createElement('td');
    const btnBorrar = document.createElement('button');
    btnBorrar.textContent = 'Borrar';
    btnBorrar.className = 'borrar';
    btnBorrar.onclick = () => borrarAsistencia(index);
    cellDeleteButton.appendChild(btnBorrar);

    // Añadir la celda del botón de borrar a la fila
    row.appendChild(cellDeleteButton);

    // Agregar la fila a la tabla
    attendanceTable.appendChild(row);
});

// Función para manejar la acción de marcar asistencia
function marcarAsistencia(rowIndex, estado) {
    for (let i = 1; i <= 6; i++) {
        const cell = document.getElementById(`cell-${rowIndex}-${i}`);
        if (cell.textContent === '') {  // Si la celda está vacía
            cell.textContent = estado;  // Llenar con "P" o "A"
            break;  // Salir del bucle después de llenar la primera celda vacía
        }
    }
}

// Función para borrar la asistencia de un estudiante
function borrarAsistencia(rowIndex) {
    for (let i = 1; i <= 6; i++) {
        const cell = document.getElementById(`cell-${rowIndex}-${i}`);
        cell.textContent = '';  // Vaciar todas las celdas de asistencia
    }
}

// Función para guardar la asistencia
function guardarAsistencia() {
    let datosAsistencia = [];

    nombres.forEach((nombre, index) => {
        let fila = {
            nombre: nombre,
            asistencia: []
        };

        for (let i = 1; i <= 6; i++) {
            const cell = document.getElementById(`cell-${index}-${i}`);
            fila.asistencia.push(cell.textContent || '-');
        }

        datosAsistencia.push(fila);
    });

    // Enviar datos al servidor
    fetch('guardar_asistencia.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAsistencia)
    })
    .then(response => response.text())
    .then(data => {
        // Mostrar el mensaje recibido del servidor
        alert(data);
    })
    .catch(error => {
        console.error('Error al guardar la asistencia:', error);
        alert('Ocurrió un error al intentar guardar la asistencia');
    });
}

// Agregar el event listener al botón "Guardar Asistencia"
document.getElementById('saveButton').addEventListener('click', guardarAsistencia);
