const productos = [
    { producto: "Origen Huila 500 g",precio: 42000 },
    { producto: "Prensa francesa",precio: 95000 },
    { producto: "Origen Nariño 250 g",precio: 26000 },
    { producto: "Origen Sierra 500 g",precio: 45000 },
    { producto: "Molino manual",precio: 120000 }
]

const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"]

function generarVentas(n) {
    const ventas=[]
    for (let i=1;i<=n;i++){
        const id=i
        const fecha="2026-09-"+String(Math.floor(Math.random()*30)+1).padStart(2,"0")
        const cliente="C"+String(Math.floor(Math.random()*n/3)+1).padStart(2,"0")
        const producto=productos[Math.floor(Math.random()*productos.length)]
        const ciudad=ciudades[Math.floor(Math.random()*ciudades.length)]
        const cantidad=Math.floor(Math.random()*5)+1
        ventas.push({id,fecha,cliente,...producto,ciudad,cantidad})
    }
return ventas
}

module.exports = {generarVentas}