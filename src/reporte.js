const ventas = require("./datos")

const {totalPorCiudad,unidadesPorProducto,topProductosPorValor} = require("./analitica")


console.log(totalPorCiudad(ventas))