document.addEventListener('DOMContentLoaded', function () {
    // Validar solo letras y espacios para los nombres de cuenta
    document.querySelectorAll('input[id^="nombre-"]').forEach(input => {
        input.addEventListener('input', function () {
            // Solo permite letras (mayúsculas, minúsculas), tildes y espacios
            this.value = this.value
                .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '') // Solo letras y espacios
                .replace(/\s{2,}/g, ' '); // No más de un espacio seguido
        });
    });

    // Validar solo números para los montos y formatear con puntos
    document.querySelectorAll('input[id^="monto-"]').forEach(input => {
        input.addEventListener('input', function () {
            let value = this.value.replace(/\./g, ''); // Quita puntos existentes
            value = value.replace(/[^0-9]/g, '');      // Solo números
            if (value) {
                value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formatea con puntos
            }
            this.value = value;
        });
    });

    // Función para agregar una cuenta
    function agregarCuenta(seccion) {
        let nombreInput, montoInput, tbody;
        if (seccion === 'activo-corriente') {
            nombreInput = document.getElementById('nombre-activo-corriente');
            montoInput = document.getElementById('monto-activo-corriente');
            tbody = document.getElementById('activo-corriente-cuentas');
        } else if (seccion === 'activo-no-corriente') {
            nombreInput = document.getElementById('nombre-activo-no-corriente');
            montoInput = document.getElementById('monto-activo-no-corriente');
            tbody = document.getElementById('activo-no-corriente-cuentas');
        } else if (seccion === 'pasivo-corriente') {
            nombreInput = document.getElementById('nombre-pasivo-corriente');
            montoInput = document.getElementById('monto-pasivo-corriente');
            tbody = document.getElementById('pasivo-corriente-cuentas');
        } else if (seccion === 'pasivo-no-corriente') {
            nombreInput = document.getElementById('nombre-pasivo-no-corriente');
            montoInput = document.getElementById('monto-pasivo-no-corriente');
            tbody = document.getElementById('pasivo-no-corriente-cuentas');
        } else if (seccion === 'patrimonio') {
            nombreInput = document.getElementById('nombre-patrimonio');
            montoInput = document.getElementById('monto-patrimonio');
            tbody = document.getElementById('patrimonio-cuentas');
        }

        const nombreCuenta = nombreInput.value.trim();
        const montoCuenta = parseInt(montoInput.value.replace(/\./g, ''), 10); // Convierte el valor a entero

        if (nombreCuenta && !isNaN(montoCuenta)) {
            const newRow = document.createElement('tr');
            newRow.classList.add('added-row'); // Agrega la clase para la animación

            const nombreCell = document.createElement('td');
            nombreCell.textContent = nombreCuenta;

            const montoCell = document.createElement('td');
            montoCell.textContent = formatNumberWithPoints(montoCuenta);

            const accionesCell = document.createElement('td');
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', function () {
                eliminarCuenta(newRow);
            });
            accionesCell.appendChild(eliminarBtn);

            newRow.appendChild(nombreCell);
            newRow.appendChild(montoCell);
            newRow.appendChild(accionesCell);

            tbody.appendChild(newRow);

            nombreInput.value = '';
            montoInput.value = '0';

            actualizarTotales();
        } else {
            alert('Por favor, ingrese un nombre de cuenta válido y un monto numérico.');
        }
    }

    // Función para eliminar una cuenta con animación
    function eliminarCuenta(row) {
        row.classList.add('removed-row'); // Agrega la clase para la animación
        row.addEventListener('animationend', function () {
            row.remove(); // Elimina la fila después de la animación
            actualizarTotales();
        });
    }

    // Función para actualizar los totales
    function actualizarTotales() {
        let totalActivoCorriente = 0;
        document.querySelectorAll('#activo-corriente-cuentas td:nth-child(2)').forEach(td => {
            totalActivoCorriente += parseInt(td.textContent.replace(/\./g, ''), 10) || 0;
        });
        document.getElementById('total-activo-corriente').textContent = formatNumberWithPoints(totalActivoCorriente);
        document.getElementById('total-activo-corriente-resumen').textContent = formatNumberWithPoints(totalActivoCorriente);

        let totalActivoNoCorriente = 0;
        document.querySelectorAll('#activo-no-corriente-cuentas td:nth-child(2)').forEach(td => {
            totalActivoNoCorriente += parseInt(td.textContent.replace(/\./g, ''), 10) || 0;
        });
        document.getElementById('total-activo-no-corriente').textContent = formatNumberWithPoints(totalActivoNoCorriente);
        document.getElementById('total-activo-no-corriente-resumen').textContent = formatNumberWithPoints(totalActivoNoCorriente);

        let totalPasivoCorriente = 0;
        document.querySelectorAll('#pasivo-corriente-cuentas td:nth-child(2)').forEach(td => {
            totalPasivoCorriente += parseInt(td.textContent.replace(/\./g, ''), 10) || 0;
        });
        document.getElementById('total-pasivo-corriente').textContent = formatNumberWithPoints(totalPasivoCorriente);
        document.getElementById('total-pasivo-corriente-resumen').textContent = formatNumberWithPoints(totalPasivoCorriente);

        let totalPasivoNoCorriente = 0;
        document.querySelectorAll('#pasivo-no-corriente-cuentas td:nth-child(2)').forEach(td => {
            totalPasivoNoCorriente += parseInt(td.textContent.replace(/\./g, ''), 10) || 0;
        });
        document.getElementById('total-pasivo-no-corriente').textContent = formatNumberWithPoints(totalPasivoNoCorriente);
        document.getElementById('total-pasivo-no-corriente-resumen').textContent = formatNumberWithPoints(totalPasivoNoCorriente);

        let totalPatrimonio = 0;
        document.querySelectorAll('#patrimonio-cuentas td:nth-child(2)').forEach(td => {
            totalPatrimonio += parseInt(td.textContent.replace(/\./g, ''), 10) || 0;
        });
        document.getElementById('total-patrimonio').textContent = formatNumberWithPoints(totalPatrimonio);
        document.getElementById('total-patrimonio-general').textContent = formatNumberWithPoints(totalPatrimonio);

        // Actualizar totales generales
        const totalActivo = totalActivoCorriente + totalActivoNoCorriente;
        const totalPasivo = totalPasivoCorriente + totalPasivoNoCorriente;
        const totalPasivoPatrimonio = totalPasivo + totalPatrimonio;

        document.getElementById('total-activo-general').textContent = formatNumberWithPoints(totalActivo);
        document.getElementById('total-pasivo-general').textContent = formatNumberWithPoints(totalPasivo);
        document.getElementById('total-pasivo-patrimonio').textContent = formatNumberWithPoints(totalPasivoPatrimonio);
    }

    // Función para formatear números con puntos como separadores de miles
    function formatNumberWithPoints(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // Event listeners para los botones de agregar
    document.getElementById('agregar-activo-corriente').addEventListener('click', () => agregarCuenta('activo-corriente'));
    document.getElementById('agregar-activo-no-corriente').addEventListener('click', () => agregarCuenta('activo-no-corriente'));
    document.getElementById('agregar-pasivo-corriente').addEventListener('click', () => agregarCuenta('pasivo-corriente'));
    document.getElementById('agregar-pasivo-no-corriente').addEventListener('click', () => agregarCuenta('pasivo-no-corriente'));
    document.getElementById('agregar-patrimonio').addEventListener('click', () => agregarCuenta('patrimonio'));
});