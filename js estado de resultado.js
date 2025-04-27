document.addEventListener('DOMContentLoaded', function () {
    // Función para formatear el valor del input con puntos como separadores de miles
    function formatInputWithPoints(input) {
        let value = input.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Agrega separadores de miles con puntos
        input.value = value;
    }

    // IDs de los inputs de monto del estado de resultados
    const idsMontos = [
        'ingresos-ordinarios-input',
        'costo-ventas-input',
        'gastos-administracion-input',
        'gastos-ventas-input',
        'otros-gastos-operacionales-input',
        'ingresos-financieros-input',
        'otros-ingresos-no-operacionales-input',
        'gastos-financieros-input',
        'otros-gastos-no-operacionales-input',
        'porcentaje-impuesto-renta-input'
    ];

    // Aplicar el formato solo a los inputs de monto del estado de resultados
    idsMontos.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function () {
                formatInputWithPoints(this);
            });
        }
    });

    // Función para aplicar estilo negativo
    function aplicarEstiloNegativo(id) {
        const elemento = document.getElementById(id);
        const valor = parseFloat(elemento.textContent.replace(/\./g, '').replace(/,/g, '')); // Elimina puntos y comas
        if (valor < 0) {
            elemento.classList.add('negativo');
        } else {
            elemento.classList.remove('negativo'); // Elimina la clase si el valor ya no es negativo
        }
    }

    // Función para calcular el Estado de Resultados
    function calcularEstadoResultados() {
        const ingresosOrdinarios = parseFloat(document.getElementById('ingresos-ordinarios-input').value.replace(/\./g, '')) || 0;
        const costoVentas = parseFloat(document.getElementById('costo-ventas-input').value.replace(/\./g, '')) || 0;
        const gastosAdministracion = parseFloat(document.getElementById('gastos-administracion-input').value.replace(/\./g, '')) || 0;
        const gastosVentas = parseFloat(document.getElementById('gastos-ventas-input').value.replace(/\./g, '')) || 0;
        const otrosGastosOperacionales = parseFloat(document.getElementById('otros-gastos-operacionales-input').value.replace(/\./g, '')) || 0;
        const ingresosFinancieros = parseFloat(document.getElementById('ingresos-financieros-input').value.replace(/\./g, '')) || 0;
        const otrosIngresosNoOperacionales = parseFloat(document.getElementById('otros-ingresos-no-operacionales-input').value.replace(/\./g, '')) || 0;
        const gastosFinancieros = parseFloat(document.getElementById('gastos-financieros-input').value.replace(/\./g, '')) || 0;
        const otrosGastosNoOperacionalesGastos = parseFloat(document.getElementById('otros-gastos-no-operacionales-input').value.replace(/\./g, '')) || 0;
        const porcentajeImpuestoRenta = parseFloat(document.getElementById('porcentaje-impuesto-renta-input').value.replace(/\./g, '')) || 0;

        const utilidadBruta = ingresosOrdinarios - costoVentas;
        const utilidadOperacional = utilidadBruta - gastosAdministracion - gastosVentas - otrosGastosOperacionales;
        const utilidadAntesImpuestos = utilidadOperacional + ingresosFinancieros + otrosIngresosNoOperacionales - gastosFinancieros - otrosGastosNoOperacionalesGastos;
        const gastoImpuestoRenta = utilidadAntesImpuestos * (porcentajeImpuestoRenta / 100);
        const utilidadNeta = utilidadAntesImpuestos - gastoImpuestoRenta;

        // Actualizar valores en la tabla
        document.getElementById('ingresos-ordinarios-resultado').textContent = formatNumberWithPoints(ingresosOrdinarios);
        document.getElementById('costo-ventas-resultado').textContent = formatNumberWithPoints(costoVentas);
        document.getElementById('utilidad-bruta-resultado').textContent = formatNumberWithPoints(utilidadBruta);
        document.getElementById('gastos-administracion-resultado').textContent = formatNumberWithPoints(gastosAdministracion);
        document.getElementById('gastos-ventas-resultado').textContent = formatNumberWithPoints(gastosVentas);
        document.getElementById('otros-gastos-operacionales-resultado').textContent = formatNumberWithPoints(otrosGastosOperacionales);
        document.getElementById('utilidad-operacional-resultado').textContent = formatNumberWithPoints(utilidadOperacional);
        document.getElementById('ingresos-financieros-resultado').textContent = formatNumberWithPoints(ingresosFinancieros);
        document.getElementById('otros-ingresos-no-operacionales-resultado').textContent = formatNumberWithPoints(otrosIngresosNoOperacionales);
        document.getElementById('gastos-financieros-resultado').textContent = formatNumberWithPoints(gastosFinancieros);
        document.getElementById('otros-gastos-no-operacionales-resultado').textContent = formatNumberWithPoints(otrosGastosNoOperacionalesGastos);
        document.getElementById('utilidad-antes-impuestos-resultado').textContent = formatNumberWithPoints(utilidadAntesImpuestos);
        document.getElementById('gasto-impuesto-renta-resultado').textContent = formatNumberWithPoints(gastoImpuestoRenta);
        document.getElementById('utilidad-neta-resultado').textContent = formatNumberWithPoints(utilidadNeta);

        // Aplicar clase 'negativo' a las utilidades si son negativas
        aplicarEstiloNegativo('utilidad-bruta-resultado');
        aplicarEstiloNegativo('utilidad-operacional-resultado');
        aplicarEstiloNegativo('utilidad-antes-impuestos-resultado');
        aplicarEstiloNegativo('utilidad-neta-resultado');
    }

    // Escuchar el botón de calcular
    document.getElementById('calcular-er').addEventListener('click', calcularEstadoResultados);

    // Formatear números con puntos
    function formatNumberWithPoints(number) {
        return number.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '.');
    }
});