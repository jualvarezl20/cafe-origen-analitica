const ventas = require("./datos")

function valorVenta(venta){
    return venta.cantidad*venta.precio
}


function totalVendido(ventas){
    let totalvendido=0
    for (const venta of ventas){
        totalvendido=totalvendido+valorVenta(venta)
    }
    return totalvendido
}


function unidadesVendidas(ventas){
    let totalunidades=0
    for (const venta of ventas){
        totalunidades=totalunidades+venta.cantidad
    }
    return totalunidades
}


function ventaMayor(ventas){
    let ventamayor=valorVenta(ventas[0])
    let ventamayorindice=ventas[0]
    for (const venta of ventas){
        if (valorVenta(venta)>ventamayor){
            ventamayor=valorVenta(venta)
            ventamayorindice=venta
        }
    }
    return ventamayorindice
}
console.log(ventaMayor(ventas))



