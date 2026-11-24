const ventas = require("./datos")
const {generarVentas} = require("./generador")

//Minireto 2

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


function normalizar (palabra){
    palabra=palabra.trim().toLowerCase()
    return palabra
}



//Minireto 3

const totalVendidoM =(ventas) => ventas.map(venta=>valorVenta(venta)).reduce((totalvendido,totalporventa)=>totalvendido+totalporventa,0)


const unidadesVendidasM = (ventas)=> ventas.map(venta=>venta.cantidad).reduce((totalunidades,unidadesporventa)=>totalunidades+unidadesporventa,0)


const ventasPorCiudadM = (ventas,ciudad)=>ventas.filter(venta=>venta.ciudad.toLowerCase().trim()===ciudad.toLowerCase().trim()).reduce((totalporciudad,totalporventa)=> totalporciudad+valorVenta(totalporventa),0)


function totalPorCiudad(ventas){
    const totalCiudad={}
    for (const venta of ventas){

        if (totalCiudad[venta.ciudad.trim().toLowerCase()]===undefined){
            totalCiudad[venta.ciudad.trim().toLowerCase()]=0
        }
        totalCiudad[venta.ciudad.trim().toLowerCase()]+=valorVenta(venta)
    }
return totalCiudad
}


function unidadesPorProducto(ventas){
    const totalunidades={}
    for (const venta of ventas){

        if (totalunidades[venta.producto.trim().toLowerCase()]===undefined){
            totalunidades[venta.producto.trim().toLowerCase()]=0
        }
        totalunidades[venta.producto.trim().toLowerCase()]+=venta.cantidad
    }
return totalunidades
}


function topProductosPorValor(ventas,k){
    const totalporproducto={}
    for (const venta of ventas){
        const producto=venta.producto.trim().toLowerCase()
        if (totalporproducto[producto]===undefined){
            totalporproducto[producto]=0
        }
        totalporproducto[producto]+=valorVenta(venta)
    }
    return  Object.entries(totalporproducto).sort((a,b)=>b[1]-a[1]).slice(0,k)
}


//Minireto 4

function ventasDelDia(ventas,fecha){
    const ventaspordia=[]
    for (const venta of ventas){
        if (venta.fecha===fecha){
            ventaspordia.push(venta)
        }
    }
    return ventaspordia
}


// Minireto 5

function totalVendidoContado(ventas){
    const contadoroperaciones={operaciones:0}
    let totalvendido=0
    for (const venta of ventas){
        contadoroperaciones.operaciones++
        totalvendido=totalvendido+valorVenta(venta)
    }
    return contadoroperaciones
}

function ventaMayorContado(ventas){
    const contadoroperaciones={operaciones:0}
    let ventamayor=valorVenta(ventas[0])
    let ventamayorindice=ventas[0]
    for (const venta of ventas){
        contadoroperaciones.operaciones++
        if (valorVenta(venta)>ventamayor){
            ventamayor=valorVenta(venta)
            ventamayorindice=venta
        }
        contadoroperaciones.operaciones++
    }
    return contadoroperaciones
}

function ventasPorCiudadContado(ventas, ciudad){
    const contadoroperaciones={operaciones:0}
    let totalvendido=0
        for (const venta of ventas){
            contadoroperaciones.operaciones++
            if (venta.ciudad.trim().toLowerCase()===ciudad.trim().toLowerCase()){
                totalvendido=totalvendido+valorVenta(venta)
            }
            contadoroperaciones.operaciones++
        }
    return contadoroperaciones
}

function primeraVenta(ventas){
    const contadoroperaciones={operaciones:0}
    ventas[0]
    contadoroperaciones.operaciones++
    return contadoroperaciones
}

// Minireto 6

function clientesRecurrentes(ventas) {
    const recurrentes = []
    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente)) {
                recurrentes.push(ventas[i].cliente)
            }
        }
    }
    return recurrentes
}


//Minireto 7

const totalCiudadCadena=(ventas,ciudad)=>ventas.map(venta=>({...venta,ciudad:venta.ciudad.toLowerCase().trim()})).filter(venta=>venta.ciudad.toLowerCase().trim()===ciudad.toLowerCase().trim()).reduce((totalporciudad,totalporventa)=> totalporciudad+valorVenta(totalporventa),0)


function totalCiudadUnaPasada(ventas, ciudad){
    let totalciudad=0
    for (const venta of ventas){
        if (normalizar(venta.ciudad)===normalizar(ciudad)){
            totalciudad+=valorVenta(venta)
        }
    }
    return totalcudad
}

console.log(totalCiudadUnaPasada(ventas, "Medellín"))



module.exports ={totalPorCiudad,unidadesPorProducto,topProductosPorValor,totalVendidoContado,ventaMayorContado,ventasPorCiudadContado,primeraVenta,clientesRecurrentes}
