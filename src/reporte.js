// ==========================================================================
// reporte.js — Analítica Café Origen v0.1 (MiniReto 4)
// [Claude · 24/11/2026] Completado por Claude. Las dos primeras líneas de
// importación son las tuyas; se agregaron funciones al require y las
// secciones del reporte. Tu línea original quedó comentada al final.
// No modifica analitica.js. Ejecutar desde la raíz:  node src/reporte.js
//
// REQUISITO: analitica.js debe exportar las funciones del require
// (ver bitácora, sección "Pendientes en el código").
// ==========================================================================

const ventas = require("./datos")

// [Claude · MR4] Se agregaron al require las funciones del MiniReto 2 y ventasDelDia
const {
    totalPorCiudad, unidadesPorProducto, topProductosPorValor,
    totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, valorVenta, ventasDelDia
} = require("./analitica")


// --------------------------------------------------------------------------
// [Claude · MR4] Ayudantes de formato (solo presentación, no calculan nada)
// --------------------------------------------------------------------------

// 985000 → "$985.000"   (toLocaleString con formato colombiano)
const pesos = (valor) => "$" + Math.round(valor).toLocaleString("es-CO")

// "medellín" → "Medellín"   (las funciones devuelven claves normalizadas)
const capitalizar = (texto) => texto[0].toUpperCase() + texto.slice(1)

// Imprime una fila alineada: etiqueta a la izquierda y valor a la derecha
const fila = (etiqueta, valor) => console.log("  " + etiqueta.padEnd(28, ".") + String(valor).padStart(18))

const titulo = (texto) => {
    console.log("\n" + texto.toUpperCase())
    console.log("-".repeat(48))
}


// --------------------------------------------------------------------------
// [Claude · MR4] Encabezado
// --------------------------------------------------------------------------
console.log("=".repeat(48))
console.log("   CAFÉ ORIGEN · REPORTE DE VENTAS v0.1")
console.log("=".repeat(48))


// --------------------------------------------------------------------------
// [Claude · MR4] Sección 1: resumen general
// --------------------------------------------------------------------------
titulo("1. Resumen general")
const mayor = ventaMayor(ventas)
fila("Registros", ventas.length)
fila("Total vendido", pesos(totalVendido(ventas)))
fila("Unidades vendidas", unidadesVendidas(ventas))
fila("Ticket promedio", pesos(ticketPromedio(ventas)))
fila("Venta mayor", `id ${mayor.id} · ${pesos(valorVenta(mayor))}`)


// --------------------------------------------------------------------------
// [Claude · MR4] Sección 2: ventas por ciudad (de mayor a menor)
// Object.entries crea un arreglo nuevo, así que ordenar no toca "ventas".
// --------------------------------------------------------------------------
titulo("2. Ventas por ciudad")
const ciudades = Object.entries(totalPorCiudad(ventas)).sort((a, b) => b[1] - a[1])
for (const [ciudad, total] of ciudades) {
    fila(capitalizar(ciudad), pesos(total))
}


// --------------------------------------------------------------------------
// [Claude · MR4] Sección 3: unidades por producto (de mayor a menor)
// --------------------------------------------------------------------------
titulo("3. Unidades por producto")
const productos = Object.entries(unidadesPorProducto(ventas)).sort((a, b) => b[1] - a[1])
for (const [producto, unidades] of productos) {
    fila(capitalizar(producto), unidades + " und")
}


// --------------------------------------------------------------------------
// [Claude · MR4] Sección 4: top 3 de productos por valor generado
// --------------------------------------------------------------------------
titulo("4. Top 3 productos por valor")
const top3 = topProductosPorValor(ventas, 3)
top3.forEach(([producto, total], posicion) => {
    fila(`${posicion + 1}. ${capitalizar(producto)}`, pesos(total))
})


// --------------------------------------------------------------------------
// [Claude · MR4] Sección 5: resumen de un día (con ventas y sin ventas)
// Si el día no tiene ventas se muestra un mensaje claro en lugar de llamar
// a ticketPromedio, que hoy devuelve NaN con un arreglo vacío (error 2 de
// la gerente, documentado en la bitácora del MiniReto 4).
// --------------------------------------------------------------------------
function resumenDelDia(fecha) {
    const delDia = ventasDelDia(ventas, fecha)
    console.log(`\n  Día ${fecha}:`)
    if (delDia.length === 0) {
        console.log("    Sin ventas registradas ese día. Total: $0 · Unidades: 0 · Ticket: $0")
        return
    }
    fila("  Ventas del día", delDia.length)
    fila("  Total del día", pesos(totalVendido(delDia)))
    fila("  Unidades del día", unidadesVendidas(delDia))
    fila("  Ticket promedio del día", pesos(ticketPromedio(delDia)))
}

titulo("5. Resumen por día")
resumenDelDia("2026-09-05")   // día con ventas
resumenDelDia("2026-09-10")   // día sin ventas

console.log("\n" + "=".repeat(48) + "\n")


// [Claude] Tu línea original (MiniReto 4, ejercicio 2), comentada para que
// no se repita la información en el reporte:
// console.log(totalPorCiudad(ventas))
