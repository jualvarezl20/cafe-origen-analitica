// ==========================================================================
// verificar.js — Pruebas del motor Café Origen
// [Claude · 24/11/2026] Archivo escrito por Claude (antes estaba vacío).
// No modifica analitica.js: solo importa sus funciones y compara resultados.
// Ejecutar desde la raíz del proyecto:  node src/verificar.js
//
// REQUISITO: analitica.js debe exportar todas las funciones que se usan
// abajo (ver bitácora, sección "Pendientes en el código").
// ==========================================================================

const ventas = require("./datos")
const { generarVentas } = require("./generador")
const {
    totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad,
    totalVendidoM, unidadesVendidasM, ventasPorCiudadM,
    totalPorCiudad, topProductosPorValor, ventasDelDia,
    clientesRecurrentes, totalCiudadCadena, totalCiudadUnaPasada
} = require("./analitica")

// [Claude] Ayudante: convierte un valor en texto para mostrarlo.
// (JSON.stringify convierte NaN en "null", por eso NaN se trata aparte)
function mostrar(valor) {
    return Number.isNaN(valor) ? "NaN" : JSON.stringify(valor)
}

// [Claude] Ayudante: compara dos valores e imprime "OK" o "DIFERENTE".
// Arreglos y objetos se comparan como texto; números y textos, con Object.is
// (Object.is sí reconoce NaN, a diferencia de ===).
function comparar(nombre, obtenido, esperado) {
    const sonObjetos = typeof obtenido === "object" || typeof esperado === "object"
    const iguales = sonObjetos
        ? JSON.stringify(obtenido) === JSON.stringify(esperado)
        : Object.is(obtenido, esperado)
    const estado = iguales ? "OK" : "DIFERENTE"
    console.log(`  ${estado.padEnd(10)} ${nombre}  →  ${mostrar(obtenido)} | ${mostrar(esperado)}`)
}

// [Claude] Ayudante: ejecuta una función y, si se rompe, devuelve el error
// como texto en lugar de detener el script (sirve para casos borde).
function probar(funcion) {
    try {
        return funcion()
    } catch (error) {
        return "ERROR: " + error.message
    }
}


// --------------------------------------------------------------------------
// [Claude · MiniReto 3] Ciclo vs. método: cada par debe dar el mismo valor.
// Se prueba con la muestra completa, con un elemento y con el arreglo vacío.
// --------------------------------------------------------------------------
console.log("\n=== MiniReto 3 · Ciclo vs. método ===")

const conjuntos = [
    { nombre: "muestra completa", datos: ventas },
    { nombre: "un elemento", datos: [ventas[0]] },
    { nombre: "arreglo vacío", datos: [] }
]

for (const conjunto of conjuntos) {
    console.log(`\n Con ${conjunto.nombre}:`)
    comparar("totalVendido     vs totalVendidoM    ", totalVendido(conjunto.datos), totalVendidoM(conjunto.datos))
    comparar("unidadesVendidas vs unidadesVendidasM", unidadesVendidas(conjunto.datos), unidadesVendidasM(conjunto.datos))
    comparar("ventasPorCiudad  vs ventasPorCiudadM ", ventasPorCiudad(conjunto.datos, "Medellín"), ventasPorCiudadM(conjunto.datos, "Medellín"))
}

// [Claude · MiniReto 3] Criterios de cumplimiento del reto
console.log("\n Criterios del MiniReto 3:")
comparar("totalPorCiudad tiene 4 ciudades", Object.keys(totalPorCiudad(ventas)).length, 4)
comparar("top 3 por valor, de mayor a menor", topProductosPorValor(ventas, 3).map(par => par[0]),
    ["origen huila 500 g", "origen sierra 500 g", "prensa francesa"])
comparar("ventas conserva su orden (primer id)", ventas[0].id, 1)
comparar("ventas conserva su orden (último id)", ventas[ventas.length - 1].id, 12)


// --------------------------------------------------------------------------
// [Claude · MiniReto 2] Casos borde con el arreglo vacío.
// Muestra el comportamiento REAL de tus funciones con ciclos. Lo esperado
// es lo decidido en la bitácora (MiniReto 2, "Decisiones con el arreglo
// vacío"). Si sale DIFERENTE, ese caso todavía falta en el código.
// --------------------------------------------------------------------------
console.log("\n=== MiniReto 2 · Arreglo vacío ===")
comparar("totalVendido([])     debe dar 0   ", probar(() => totalVendido([])), 0)
comparar("unidadesVendidas([]) debe dar 0   ", probar(() => unidadesVendidas([])), 0)
comparar("ventasPorCiudad([])  debe dar 0   ", probar(() => ventasPorCiudad([], "Cali")), 0)
comparar("ventaMayor([])       debe dar null", probar(() => ventaMayor([])), null)
comparar("ticketPromedio([])   debe dar 0   ", probar(() => ticketPromedio([])), 0)


// --------------------------------------------------------------------------
// [Claude · MiniReto 4] Los dos errores que reportó la gerente.
// --------------------------------------------------------------------------
console.log("\n=== MiniReto 4 · Errores reportados por la gerente ===")

// Error 1: "Bogotá aparecía dos veces". Se agrega una venta con "Bogotá "
// (con espacio al final) y se cuenta cuántos grupos contienen "bogot".
const ventasConBogotaMalEscrita = [...ventas, {
    id: 13, fecha: "2026-09-07", cliente: "C09", producto: "Molino manual",
    ciudad: "Bogotá ", cantidad: 1, precio: 120000
}]
const gruposBogota = Object.keys(totalPorCiudad(ventasConBogotaMalEscrita))
    .filter(ciudad => ciudad.includes("bogot"))
comparar("Error 1: Bogotá aparece una sola vez", gruposBogota.length, 1)

// Error 2: "el ticket promedio daba NaN cuando filtraba un día sin ventas"
const diaSinVentas = ventasDelDia(ventas, "2026-09-10")
comparar("Error 2: un día sin ventas devuelve []", diaSinVentas, [])
comparar("Error 2: ticket de un día sin ventas debe dar 0", ticketPromedio(diaSinVentas), 0)


// --------------------------------------------------------------------------
// [Claude · MiniReto 6] clientesRecurrentes con los 12 datos del Día 1.
// --------------------------------------------------------------------------
console.log("\n=== MiniReto 6 · Clientes recurrentes ===")
comparar("clientesRecurrentes(ventas)", clientesRecurrentes(ventas), ["C01", "C02", "C03"])


// --------------------------------------------------------------------------
// [Claude · MiniReto 7] Cadena de métodos vs. una sola pasada, con 10.000
// ventas generadas y con la muestra del Día 1.
// --------------------------------------------------------------------------
console.log("\n=== MiniReto 7 · totalCiudadCadena vs totalCiudadUnaPasada ===")
const ventas10000 = generarVentas(10000)
for (const ciudad of ["Medellín", "Bogotá", "Cali", "Pereira"]) {
    comparar(`10.000 ventas, ${ciudad.padEnd(8)}`, totalCiudadCadena(ventas10000, ciudad), totalCiudadUnaPasada(ventas10000, ciudad))
}
comparar("muestra del Día 1, Medellín", totalCiudadCadena(ventas, "Medellín"), totalCiudadUnaPasada(ventas, "Medellín"))

console.log("\nFin de la verificación.\n")
