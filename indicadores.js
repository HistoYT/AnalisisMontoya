document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos HTML
    const valorRosTd = document.getElementById('valor-ros');
    const valorRazonCorrienteTd = document.getElementById('valor-razon-corriente');
    const valorEndeudamientoTd = document.getElementById('valor-endeudamiento');
    const valorRoeTd = document.getElementById('valor-roe');
    const valorRoaTd = document.getElementById('valor-roa');
    const calcularIndicadoresBtn = document.getElementById('calcular-indicadores-btn'); // Botón agregado

    // Función para dar formato a los números con comas (formato moneda Colombia)
    function formatNumberWithCommas(number) {
        return number.toLocaleString('es-CO', { 
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Función para limpiar números de cadenas
    function limpiarNumero(texto) {
        if (!texto) return 0;
        const numeroLimpio = texto.replace(/[^\d.-]/g, '');
        return parseFloat(numeroLimpio) || 0;
    }

    // Función para calcular los indicadores financieros
    function calcularIndicadoresFinancieros() {
        // Obtener valores del Balance General
        const totalActivo = limpiarNumero(document.getElementById('total-activo-general').textContent);
        const totalPasivo = limpiarNumero(document.getElementById('total-pasivo-general').textContent);
        const totalPatrimonio = limpiarNumero(document.getElementById('total-patrimonio-general').textContent);
        const totalActivoCorriente = limpiarNumero(document.getElementById('total-activo-corriente-resumen').textContent);
        const totalPasivoCorriente = limpiarNumero(document.getElementById('total-pasivo-corriente-resumen').textContent);

        // Obtener valores del Estado de Resultados
        const ingresosOrdinarios = limpiarNumero(document.getElementById('ingresos-ordinarios-resultado').textContent);
        const utilidadNeta = limpiarNumero(document.getElementById('utilidad-neta-resultado').textContent);

        // Calcular los indicadores
        const ros = ingresosOrdinarios !== 0 ? utilidadNeta / ingresosOrdinarios : 0;
        const razonCorriente = totalPasivoCorriente !== 0 ? totalActivoCorriente / totalPasivoCorriente : 0;
        const endeudamiento = totalActivo !== 0 ? totalPasivo / totalActivo : 0;
        const roe = totalPatrimonio !== 0 ? utilidadNeta / totalPatrimonio : 0;
        const roa = totalActivo !== 0 ? utilidadNeta / totalActivo : 0;

        // Mostrar los resultados en los elementos HTML
        valorRosTd.textContent = formatNumberWithCommas(ros * 100) + '%';
        valorRazonCorrienteTd.textContent = formatNumberWithCommas(razonCorriente);
        valorEndeudamientoTd.textContent = formatNumberWithCommas(endeudamiento * 100) + '%';
        valorRoeTd.textContent = formatNumberWithCommas(roe * 100) + '%';
        valorRoaTd.textContent = formatNumberWithCommas(roa * 100) + '%';
    }

    // Llama a calcularIndicadoresFinancieros cuando se hace clic en el botón
    if (calcularIndicadoresBtn) {
        calcularIndicadoresBtn.addEventListener('click', calcularIndicadoresFinancieros);
    }

    // Eliminar el listener que disparaba el cálculo al calcular el Estado de Resultados
    const calcularButton = document.getElementById('calcular-er');
    if (calcularButton) {
        // calcularButton.addEventListener('click', calcularIndicadoresFinancieros); // Eliminar esta línea
    }

    // Calcula los indicadores iniciales
    // calcularIndicadoresFinancieros(); // Eliminar esta línea: No calcular al cargar la página
});