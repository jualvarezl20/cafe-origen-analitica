# Microreto 1:

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


# Microreto 2:

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



