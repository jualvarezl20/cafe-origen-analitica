const {generarVentas} = require("./generador")
const {totalVendidoContado,ventaMayorContado,ventasPorCiudadContado,primeraVenta,clientesRecurrentes} = require("./analitica")

const valorespuesta=[100,1000,10000,100000]
const resultadosmedir=[]

for (const n of valorespuesta) {
    const ventas = generarVentas(n)
    resultadosmedir.push({
        n: n,
        totalVendidoContado: totalVendidoContado(ventas).operaciones,
        ventaMayorContado: ventaMayorContado(ventas).operaciones,
        ventasPorCiudadContado: ventasPorCiudadContado(ventas, "medellin").operaciones,
        primeraVenta: primeraVenta(ventas).operaciones
    })
}

console.time("Tiempo ejecución")
const pruebatimepo=clientesRecurrentes(generarVentas(100000))
console.timeEnd("Tiempo ejecución")


