const {generarVentas} = require("./generador")
const {totalVendidoContado,ventaMayorContado,ventasPorCiudadContado} = require("./analitica")

console.log(ventaMayorContado(generarVentas(1000)))

