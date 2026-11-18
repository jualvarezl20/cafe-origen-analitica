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


function ticketPromedio(ventas){
    let cantidadventas=0
    for (const venta of ventas){
        if (venta.cantidad>0) {
            cantidadventas++
        }
    }
    return totalVendido(ventas)/cantidadventas
}



function ventasPorCiudad(ventas, ciudad){
    let totalvendido=0
        for (const venta of ventas){
            if (venta.ciudad.trim().toLowerCase()===ciudad.trim().toLowerCase()){
                totalvendido=totalvendido+valorVenta(venta)
            }
        }
    return totalvendido
}


console.log(valorVenta(ventas[0]))
console.log(totalVendido(ventas))
console.log(unidadesVendidas(ventas))
console.log(ventaMayor(ventas))
console.log(ticketPromedio(ventas))
console.log(ventasPorCiudad(ventas,"Medellín"))





