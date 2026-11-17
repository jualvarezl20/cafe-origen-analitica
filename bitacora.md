## Microreto 1:

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


## Microreto 2:

Función valorVenta:

Entrada: Cantidad de productos y valor por producto.
Salida: Sale el total a pagar por una venta.
Proceso: Se multiplica cantidad de producto por valor producto y sale un nuero. 