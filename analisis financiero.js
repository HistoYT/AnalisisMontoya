document.addEventListener('DOMContentLoaded', function() {
    const calcularAnalisisBtn = document.getElementById('calcular-analisis-btn');
    const recomendacionesResultado = document.getElementById('recomendaciones');

    // Funciones para obtener los datos del balance y del estado de resultados
    function obtenerDatosBalanceGeneral() {
        const totalActivoCorriente = parseFloat(document.getElementById('total-activo-corriente-resumen').textContent) || 0;
        const totalActivoNoCorriente = parseFloat(document.getElementById('total-activo-no-corriente-resumen').textContent) || 0;
        const totalPasivoCorriente = parseFloat(document.getElementById('total-pasivo-corriente-resumen').textContent) || 0;
        const totalPasivoNoCorriente = parseFloat(document.getElementById('total-pasivo-no-corriente-resumen').textContent) || 0;
        const totalPatrimonio = parseFloat(document.getElementById('total-patrimonio-general').textContent) || 0;
        const totalActivo = totalActivoCorriente + totalActivoNoCorriente;
        const totalPasivo = totalPasivoCorriente + totalPasivoNoCorriente;

        return {
            totalActivoCorriente,
            totalActivoNoCorriente,
            totalPasivoCorriente,
            totalPasivoNoCorriente,
            totalPatrimonio,
            totalActivo,
            totalPasivo
        };
    }

    function obtenerDatosEstadoResultados() {
        const ingresosOrdinarios = parseFloat(document.getElementById('ingresos-ordinarios-resultado').textContent) || 0;
        const utilidadNeta = parseFloat(document.getElementById('utilidad-neta-resultado').textContent) || 0;

        return {
            ingresosOrdinarios,
            utilidadNeta
        };
    }

    function calcularAnalisis() {
        // Obtener datos del balance y del estado de resultados
        const {
            totalActivoCorriente,
            totalActivoNoCorriente,
            totalPasivoCorriente,
            totalPasivoNoCorriente,
            totalPatrimonio,
            totalActivo,
            totalPasivo
        } = obtenerDatosBalanceGeneral();
        const {
            ingresosOrdinarios,
            utilidadNeta
        } = obtenerDatosEstadoResultados();

        // Validar si no hay valores digitados
        if (
            totalActivoCorriente === 0 &&
            totalActivoNoCorriente === 0 &&
            totalPasivoCorriente === 0 &&
            totalPasivoNoCorriente === 0 &&
            totalPatrimonio === 0 &&
            ingresosOrdinarios === 0 &&
            utilidadNeta === 0
        ) {
            recomendacionesResultado.textContent = "No hay valores digitados";
            return;
        }

        // Calcular ratios
        const razonCorriente = totalPasivoCorriente !== 0 ? totalActivoCorriente / totalPasivoCorriente : 0;
        const margenUtilidadNeta = ingresosOrdinarios !== 0 ? utilidadNeta / ingresosOrdinarios : 0;
        const endeudamiento = totalActivo !== 0 ? totalPasivo / totalActivo : 0;
        const roa = totalActivo !== 0 ? utilidadNeta / totalActivo : 0;

        // Generar recomendaciones
        let recomendaciones = "Basado en el análisis de sus datos financieros, aquí hay algunas áreas donde la empresa puede mejorar:\n\n";

        if (razonCorriente < 1.2) {
            recomendaciones += "- **Razón Corriente:** La razón corriente de " + razonCorriente.toFixed(2) + " es baja, lo que sugiere que la empresa puede tener dificultades para cumplir con sus obligaciones a corto plazo. Se recomienda mejorar la liquidez mediante la optimización de la gestión del capital de trabajo, como la reducción de inventario, el aumento de la eficiencia en la cobranza o la renegociación de los pasivos a corto plazo.\n";
        } else if (razonCorriente < 2) {
            recomendaciones += "- **Razón Corriente:** La razón corriente de " + razonCorriente.toFixed(2) + " indica una posición de liquidez aceptable. Sin embargo, se puede mejorar la eficiencia en la gestión del capital de trabajo para optimizar el uso de los activos corrientes y reducir los pasivos corrientes.\n";
        } else {
            recomendaciones += "- **Razón Corriente:** La razón corriente de " + razonCorriente.toFixed(2) + " indica una sólida posición de liquidez, lo que sugiere que la empresa tiene una buena capacidad para cumplir con sus obligaciones a corto plazo.\n";
        }

        if (margenUtilidadNeta < 0.05) {
            recomendaciones += "- **Margen de Utilidad Neta:** El margen de utilidad neta es de " + (margenUtilidadNeta * 100).toFixed(2) + "%, lo cual es bajo. Se recomienda realizar un análisis exhaustivo de los costos y gastos para identificar áreas de mejora en la eficiencia operativa. Esto puede incluir la reducción de costos de producción, la optimización de los gastos de venta y administración, o el aumento de los precios de venta.\n";
        } else if (margenUtilidadNeta < 0.15) {
            recomendaciones += "- **Margen de Utilidad Neta:** El margen de utilidad neta es de " + (margenUtilidadNeta * 100).toFixed(2) + "%, lo cual es aceptable. Se sugiere mantener un enfoque en la eficiencia operativa y la gestión de costos para preservar y, de ser posible, aumentar la rentabilidad.\n";
        } else {
            recomendaciones += "- **Margen de Utilidad Neta:** El margen de utilidad neta es de " + (margenUtilidadNeta * 100).toFixed(2) + "%, lo cual es bueno. Esto indica una alta rentabilidad y una eficiente gestión de los costos y gastos.\n";
        }

        if (endeudamiento > 0.7) {
            recomendaciones += "- **Endeudamiento:** El nivel de endeudamiento es de " + endeudamiento.toFixed(2) + ", lo cual es alto. Esto indica un alto riesgo financiero y una mayor dependencia de los acreedores. Se recomienda reducir el endeudamiento mediante la generación de flujo de caja, la venta de activos no esenciales o la búsqueda de financiamiento a través de la emisión de capital.\n";
        } else if (endeudamiento > 0.5) {
            recomendaciones += "- **Endeudamiento:** El nivel de endeudamiento es de " + endeudamiento.toFixed(2) + ", lo cual es moderado. Se sugiere mantener el endeudamiento bajo control y evaluar la posibilidad de reducirlo para disminuir el riesgo financiero.\n";
        } else {
            recomendaciones += "- **Endeudamiento:** El nivel de endeudamiento es de " + endeudamiento.toFixed(2) + ", lo cual es bajo. Esto indica una buena salud financiera y una baja dependencia de la deuda.\n";
        }

        if (roa < 0.03) {
            recomendaciones += "- **Retorno sobre Activos (ROA):** El ROA es de " + roa.toFixed(2) + ", lo cual es bajo. Esto sugiere que la empresa no está utilizando sus activos de manera eficiente para generar ganancias. Se recomienda mejorar la eficiencia operativa, aumentar la rotación de activos y evaluar la rentabilidad de las inversiones.\n";
        } else if (roa < 0.08) {
            recomendaciones += "- **Retorno sobre Activos (ROA):** El ROA es de " + roa.toFixed(2) + ", lo cual es aceptable. Sin embargo, se puede mejorar la eficiencia en la utilización de los activos para generar mayores ganancias.\n";
        } else {
            recomendaciones += "- **Retorno sobre Activos (ROA):** El ROA es de " + roa.toFixed(2) + ", lo cual es bueno. Esto indica una eficiente utilización de los activos para generar ganancias.\n";
        }

        recomendacionesResultado.textContent = recomendaciones;
    }

    calcularAnalisisBtn.addEventListener('click', calcularAnalisis);
});