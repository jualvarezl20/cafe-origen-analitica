# Minireto 1:

## Diccionario de Datos

| Propiedad |    Tipo    |   Significado   |     Ejemplo     |
|-----------|------------|-----------------|-----------------|
| id        |   number   |Numero de venta  |        1        |
| fecha     |   string   |Fecha de la venta|    2026-09-01   |
| cliente   |   string   |Código del clinte|       C01       |
| producto  |   string   |Producto vendido |Origen Huila 500g|
| ciudad    |   string   |  Ciudad venta   |     Medellín    |
| cantidad  |   number   |Cantidadproductos|        2        |
| precio    |   number   | Precio producto |      42000      |

## Cassos borde detectados

Caso borde 1: La venta con id 5, tiene un"medellín" con la m minuscula. Para solucionar esto, se modificará posteriomente datos similares cambiando todo a minusculo o mayuscula.

Caso borde 2: La venta con id 8 se observa una cantidad 0. No se tendrá en cunta para los analisis a no ser que se diga lo contrario tipo "es una oferta".

Caso borde 3: Se repite el codigo del clinte en varias ventas, y aunque puede que no sea un error, ya que puede generar diferentes ventas, si es curioso la conbinación de fechas cantidades, productos y ciudades en cada clinte repetido. Se va a dejar igual por ahra a no ser de que se enuntre mas información y se puede decidir si es un error o es algo normal.


# Minireto  2:

## Pseudocódigo de cada indicador

Función valorVenta:
Entrada: Cantidad de productos y valor por producto, los dos sacados de la lista ventas.
Salida: Sale el total a pagar por una venta.
Proceso: Se multiplica cantidad de producto por valor producto y sale un nuero.

Función totalVendido:
Entrada: Entra la función valorVenta con cada uno de los objetos de la lista.
Salida: Sale la sumatoria de las ventas de la lista.
Proceso: Se crea un acumulador y se comienza a recorrer la lista ventas, sacando valorVenta y acumulandolo.

Función unidadesVendidas:
Entrada: Cantidad de unidades vendidas, se saca de la lista ventas.
Salida: Sale el total de las unidades vendidas.
Proceso: Se crea un acumulador y se recorre ventas, se suma las unidades vendidas.

Función ventaMayor:
Entrada: Entra la función valorVenta con cada uno de los objetos de la lista.
Salida: El objeto con mayor valor de venta.
Proceso: Se recorre la lista ventas usando valorVenta para obtener los valores de cada venta, y posteriomente compararlos con el siguinte y en caso de ser mayor, guardar el objeto completo de la venta.

Función ticketPromedio:
Entrada: Entra la función totalVendido y la cantidad de productos de la lista ventas por objeto.
Salida: Valor numerico que indica el promedio del valor total dividido la cantidad de ventas validas.
Proceso: Se crea un contadoe, y se recorre la lista ventas llamndo su parametro cantidad, se realiza una validación de que sea mayor a 0 y posteriomente se suma +1 al contador para luego usar la función totalVendido y dividirlo por el contador ya mencionado.

Función ventasPorCiudad:

Entrada: La lista ventas y el nombre de la ciudad a buscar.
Salida: Valor numerico que indica el total de ventas por ciudad.
Proceso: Se crea un acumulador y se recorre la lista ventas, se valida que el nombre de la ciudad sea igual al parametro de entrada, y en caso de ser igual, se llama a la función valorVenta y se suma al acumulador.

## Tabla de traza ejercicios 6 y 7

|     Función      | Prueba Arreglo comleto | Prueba Arreglo vacio | Prueba Arreglo con un elemnto(0) |
|------------------|------------------------|----------------------|----------------------------------|
| valorVenta       |    84000 (venta[0])    |         Error        |             84000                |
| totalVendido     |         985000         |         Error        |             84000                |
| unidadesVendidas |           21           |         Error        |               2                  |
| ventaMayor       |    Elemnto con id:10   |         Error        |        Elemento completo         |
| ticketPromedio   |       89545.4545       |         Error        |             84000                |
| ventasPorCiudad  |    356000 (medellín)   |         Error        |        84000 (medellín)          |


## Minireto 3:

## totalVendidoM(ventas)
¿Qué recorro?: Todas las ventas, con "map" y luego con "reduce".
¿Qué filtro?: Ninguna; se toman todas.
¿Qué transformo?: Cada venta en su valor (cantidad × precio), con "map" y "valorVenta".
¿Qué acumulo?: La suma de los valores, con "reduce" empezando en 0.
¿Cómo agrupo?: No agrupa; el resultado es un solo número.

## unidadesVendidasM(ventas)
¿Qué recorro?: Todas las ventas, con "map" y luego con "reduce".
¿Qué filtro?: Ninguna.
¿Qué transformo?: Cada venta en su cantidad, con "map".
¿Qué acumulo?: La suma de las cantidades, con "reduce" empezando en 0.
¿Cómo agrupo?: No agrupa.

## ventasPorCiudadM(ventas, ciudad)
¿Qué recorro?: Todas las ventas con "filter", y luego solo las filtradas con "reduce".
¿Qué filtro?: Solo las ventas cuya ciudad, normalizada con "toLowerCase()" y "trim()", es igual a la ciudad buscada, normalizada de la misma forma. Así se incluye la venta escrita como "medellín ".
¿Qué transformo?: No uso "map". El valor de cada venta se calcula dentro del "reduce", con "valorVenta".
¿Qué acumulo?: La suma de los valores de las ventas filtradas, con "reduce" empezando en 0.
¿Cómo agrupo?: No agrupa; calcula el total de una sola ciudad.

## totalPorCiudad(ventas)
¿Qué recorro?: Todas las ventas, con "for...of".
¿Qué filtro?: Ninguna.
¿Qué transformo?: La ciudad de cada venta, normalizada con "trim()" y "toLowerCase()" para usarla como clave.
¿Qué acumulo?: El valor de cada venta ("valorVenta"), sumado en el grupo de su ciudad.
¿Cómo agrupo?: Con un objeto como diccionario: la clave es la ciudad normalizada y el valor, el total vendido. Si la clave todavía no existe, se crea en 0. Resultado: 4 ciudades, sin grupos duplicados.

## unidadesPorProducto(ventas)
¿Qué recorro?: Todas las ventas, con "for...of".
¿Qué filtro?: Ninguna.
¿Qué transformo?: El nombre del producto, normalizado con "trim()" y "toLowerCase()" para usarlo como clave.
¿Qué acumulo?: La cantidad de cada venta, sumada en el grupo de su producto.
¿Cómo agrupo?: Con un objeto como diccionario: la clave es el producto normalizado y el valor, las unidades vendidas. Si la clave no existe, se crea en 0.

## topProductosPorValor(ventas, k)
¿Qué recorro?: Todas las ventas con "for...of", para agrupar. Después, la lista de pares, para ordenar.
¿Qué filtro?: Ninguna venta. Al final me quedo con los primeros k productos usando "slice(0, k)".
¿Qué transformo?: Cada venta en su valor ("valorVenta"). Después, el objeto de grupos en una lista de pares "[producto, total]" con "Object.entries".
¿Qué acumulo?: El valor total de cada producto.
¿Cómo agrupo?: Por producto normalizado, con un objeto como diccionario. Luego ordeno los pares de mayor a menor con "sort((a, b) => b[1] - a[1])", aplicado sobre una copia ("[...pares]") para no modificar ningún arreglo existente. El arreglo "ventas" conserva su orden original.




prediccion para las funciones de microreto 5:

totalVendido: para esta función se tendra n*1 operaciones, sinedo  las la cantidad de ventas.

ventaMayor:para esta función se tendra n*2 operaciones, sinedo n las la cantidad de ventas.

totalPorCiudad:para esta función se tendra n*2 operaciones, sinedo n las la cantidad de ventas.

Si n es 10,100,1000 siplemente se multiplica por el numero que se identificó de operaciones dentro de cada funcion y ya se especificó.


## Minireto 6

Tiempo ejecución: 4.5ms para n=1000
Tiempo ejecución: 17.071ms para n=2000
Tiempo ejecución: 62.436ms para n=4000
Tiempo ejecución: 295.699ms para n=8000
Tiempo ejecución: 1.034s para n=16000

cómo es una función O(n^2), a simple vista se observa que al duplicar n, se uadruplica, y sto tiene sentido por la misma función.

usamos el tiempo de ejecución 1 cómo parametro de predicción, cómo la función con n=1 no es concluyente ya que hay tiempos fijos pequeños que no son comparables en una magnitud pequeña. Para resolver esto usamos el primer resulyado y lo usamos para definir la nueva funcion de tiempo, por lo cual tenemo Tiempo(n)=((n/1000)^2)*4.5

Tiempo(100000)=45000 ms o 45 s
Tiempo(1000000)=4500000 ms o 4500 s 75 min

tempo calculdo en consola para Tiempo(100000)=57.969s

EL recurrentes.includes afecta bastante, porque lo que hace es mirar si el cliente ya está incluido en la lista de clientes recurrentes, por o cual revisa una vez mas toda la lista mirando esta condicion.

COnclusion:
