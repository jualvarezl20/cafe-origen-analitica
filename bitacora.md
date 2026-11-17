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

Caso borde 1: La venta con id 5, tiene un"medellín" con la m minuscula.

Caso borde 2: En la posición 8 se observa una cantidad 0.

Caso borde 3: Se repite el codigo del clinte en varias ventas, y aunque puede que no sea un error, ya que puede generar diferentes ventas, si es curioso la conbinación de fechas cantidades, productos y ciudades en cada clinte repetido.


