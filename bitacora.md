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


<!-- [Claude · MiniReto 1] Nota agregada: precisión sobre el caso borde 1. -->
> **Nota (MR1):** en `datos.js` la ciudad de la venta 5 es `"medellín "`: tiene minúscula **y además un espacio al final**. Por eso normalizar solo con `toLowerCase()` no basta; también hace falta `trim()`. Así lo hacen las funciones de los MiniRetos 2 y 3.


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
| totalVendido     |         985000         |           0          |             84000                |
| unidadesVendidas |           21           |           0          |               2                  |
| ventaMayor       |    Elemnto con id:10   |        Se rompe      |        Elemento completo         |
| ticketPromedio   |       89545.4545       |         Error        |             84000                |
| ventasPorCiudad  |    356000 (medellín)   |           0          |        84000 (medellín)          |



<!-- [Claude · MiniReto 2] Desde aquí hasta "Minireto 3": comportamiento real con el arreglo vacío, decisiones y dos trazas manuales. La tabla de arriba quedó igual. -->

### Resultados reales con el arreglo vacío (MR2)

Esto confirma la tabla de arriba con lo que se obtuvo al ejecutar las funciones (se puede comprobar con `node src/verificar.js`, sección MiniReto 2). Un detalle: `ticketPromedio([])` no lanza un error, sino que devuelve `NaN`.

| Función | Resultado real con `[]` | ¿Cumple el criterio? |
|---|---|---|
| `totalVendido([])` | `0` | ✅ Sí |
| `unidadesVendidas([])` | `0` | ✅ Sí |
| `ventasPorCiudad([], ciudad)` | `0` | ✅ Sí |
| `ventaMayor([])` | Se rompe: `Cannot read properties of undefined (reading 'cantidad')` | ❌ No |
| `ticketPromedio([])` | `NaN` (0 ÷ 0) | ❌ No |
| `valorVenta` | No aplica: recibe una venta, no un arreglo | — |

### Decisiones con el arreglo vacío (MR2)

- **totalVendido, unidadesVendidas y ventasPorCiudad → `0`.** Si no hay ventas, no se vendió nada. El acumulador empieza en 0 y el ciclo no da ninguna vuelta, así que ya devuelven 0 sin cambios.
- **ventaMayor → `null`.** Con el arreglo vacío no existe ningún registro que devolver, y `null` significa "no hay". Hoy falla porque la primera línea lee `ventas[0]`, que es `undefined`. *Pendiente en el código:* antes de leer `ventas[0]`, revisar si el arreglo está vacío.
- **ticketPromedio → `0`.** Sin ventas válidas no hay ticket, y un reporte nunca debe mostrar `NaN`. Hoy divide entre `cantidadventas`, que vale 0. *Pendiente en el código:* si `cantidadventas` es 0, devolver 0 antes de dividir.

### Traza manual 1: `totalVendido(ventas)` (MR2)

`totalvendido` empieza en 0 y en cada vuelta suma `valorVenta(venta)` = cantidad × precio.

| Vuelta | id | cantidad × precio | valorVenta | totalvendido después |
|---|---|---|---|---|
| 1 | 1 | 2 × 42.000 | 84.000 | 84.000 |
| 2 | 2 | 1 × 26.000 | 26.000 | 110.000 |
| 3 | 3 | 1 × 95.000 | 95.000 | 205.000 |
| 4 | 4 | 1 × 42.000 | 42.000 | 247.000 |
| 5 | 5 | 3 × 45.000 | 135.000 | 382.000 |
| 6 | 6 | 2 × 26.000 | 52.000 | 434.000 |
| 7 | 7 | 1 × 120.000 | 120.000 | 554.000 |
| 8 | 8 | 0 × 42.000 | 0 | 554.000 |
| 9 | 9 | 2 × 45.000 | 90.000 | 644.000 |
| 10 | 10 | 4 × 42.000 | 168.000 | 812.000 |
| 11 | 11 | 1 × 95.000 | 95.000 | 907.000 |
| 12 | 12 | 3 × 26.000 | 78.000 | **985.000** |

Resultado a mano: **985.000**. El programa da 985.000 ✅. La venta 8 (cantidad 0) suma 0, así que no altera el total.

### Traza manual 2: `ventasPorCiudad(ventas, "Medellín")` (MR2)

La ciudad buscada normalizada es `"medellín"`. Solo suman las vueltas donde `venta.ciudad.trim().toLowerCase()` es igual.

| Vuelta | id | ciudad (dato) | normalizada | ¿Coincide? | totalvendido después |
|---|---|---|---|---|---|
| 1 | 1 | "Medellín" | medellín | Sí (+84.000) | 84.000 |
| 2–3 | 2, 3 | Bogotá, Cali | — | No | 84.000 |
| 4 | 4 | "Medellín" | medellín | Sí (+42.000) | 126.000 |
| 5 | 5 | "medellín " | medellín | Sí (+135.000) | 261.000 |
| 6–10 | 6–10 | Bogotá, Bogotá, Cali, Cali, Pereira | — | No | 261.000 |
| 11 | 11 | "Medellín" | medellín | Sí (+95.000) | 356.000 |
| 12 | 12 | "Bogotá" | — | No | **356.000** |

Resultado a mano: **356.000**. El programa da 356.000 ✅. La venta 5 entra gracias a `trim()` y `toLowerCase()`.


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





<!-- [Claude · MiniReto 3] Corrección y resultados de verificar.js -->
> **Corrección (MR3):** arriba dice que el ordenamiento se aplica "sobre una copia (`[...pares]`)". En el código, el `sort` se aplica directamente al resultado de `Object.entries(...)`, sin `[...]`. Igual está bien: `Object.entries` **ya crea un arreglo nuevo**, así que ordenarlo no toca `ventas`. Se comprobó en `verificar.js`: después de llamar las funciones, `ventas` sigue empezando en el id 1 y terminando en el 12.

### Resultado de `node src/verificar.js` (MR3)

<!-- [Claude · MiniReto 3] verificar.js fue escrito por Claude; antes estaba vacío. -->
`verificar.js` ejecuta la versión con ciclo y la versión con métodos con los mismos datos, en tres casos: muestra completa, un elemento y arreglo vacío.

| Par | Muestra completa | Un elemento | Vacío |
|---|---|---|---|
| totalVendido vs totalVendidoM | OK (985.000) | OK (84.000) | OK (0) |
| unidadesVendidas vs unidadesVendidasM | OK (21) | OK (2) | OK (0) |
| ventasPorCiudad vs ventasPorCiudadM ("Medellín") | OK (356.000) | OK (84.000) | OK (0) |

Criterios del reto: `totalPorCiudad` devuelve 4 ciudades sin duplicados (OK); el top 3 por valor es Origen Huila 500 g, Origen Sierra 500 g y Prensa francesa (OK); y `ventas` conserva su orden original (OK).


<!-- [Claude · MiniReto 4] Sección nueva completa. -->
# Minireto 4:

## Reporte v0.1 (`node src/reporte.js`)

<!-- [Claude · MiniReto 4] reporte.js fue completado por Claude; la línea original de Juanes quedó comentada al final del archivo. -->
El reporte muestra cinco secciones: **1. Resumen general** (registros, total, unidades, ticket promedio y venta mayor), **2. Ventas por ciudad**, **3. Unidades por producto**, **4. Top 3 de productos por valor** y **5. Resumen por día**, con un día con ventas (2026-09-05) y uno sin ventas (2026-09-10). Los valores salen en pesos con `toLocaleString("es-CO")` y las columnas están alineadas con `padEnd` y `padStart`.

Valores del reporte con la muestra: total $985.000 · 21 unidades · ticket $89.545 · venta mayor id 10 ($168.000) · Medellín $356.000, Bogotá $276.000, Cali $185.000, Pereira $168.000.

## Registro de depuración: errores reportados por la gerente

### Error 1: "Bogotá aparecía dos veces"

- **Síntoma:** en la versión del compañero, el total por ciudad mostraba dos grupos de Bogotá.
- **Entrada que lo produce:** ventas con la ciudad escrita de dos formas, por ejemplo `"Bogotá"` y `"Bogotá "` (con espacio) o `"bogotá"`.
- **Hipótesis:** la agrupación usa el texto de la ciudad tal como viene, sin normalizar, así que JavaScript ve dos claves distintas en el objeto.
- **Prueba realizada:** en `verificar.js` (sección MiniReto 4) se agrega a la muestra una venta con `"Bogotá "` y se cuentan los grupos de `totalPorCiudad` que contienen "bogot". Resultado: **1 grupo** (OK).
- **Causa:** comparar o agrupar textos sin `trim()` ni `toLowerCase()`.
- **Corrección:** en mi versión no aparece, porque `totalPorCiudad` usa `venta.ciudad.trim().toLowerCase()` como clave. La prueba lo demuestra.

### Error 2: "el ticket promedio daba NaN cuando filtraba un día sin ventas"

- **Síntoma:** al pedir el resumen de un día sin ventas, el ticket promedio sale `NaN`.
- **Entrada que lo produce:** `ticketPromedio(ventasDelDia(ventas, "2026-09-10"))`. El 10 de septiembre no tiene ventas, así que `ventasDelDia` devuelve `[]`.
- **Hipótesis:** `ticketPromedio` divide el total entre la cantidad de ventas válidas y, sin ventas, divide 0 entre 0.
- **Prueba realizada:** en `verificar.js` (sección MiniReto 4): `ventasDelDia` devuelve `[]` (OK) y `ticketPromedio([])` devuelve **NaN** (DIFERENTE). **El error sí se reproduce en mi versión.**
- **Causa:** `return totalVendido(ventas)/cantidadventas` se ejecuta aunque `cantidadventas` valga 0.
- **Corrección:**
  - *En el reporte (ya hecho):* `reporte.js` revisa si el día tiene ventas antes de calcular. Si no hay, muestra "Sin ventas registradas ese día. Total: $0 · Unidades: 0 · Ticket: $0". Así el reporte nunca muestra NaN.
  - *En la función (pendiente en el código):* que `ticketPromedio` devuelva 0 cuando `cantidadventas` sea 0, como se decidió en el MiniReto 2. Cuando eso esté, la prueba de `verificar.js` pasará a OK.

## Verificación final del reporte (MR4)

Se ejecutó el reporte completo: no aparece `NaN`, `undefined` ni ciudades duplicadas. Aparte del reporte, en la consola se ve un `356000` suelto. Viene del `console.log` de prueba que está al final de `analitica.js` (ver "Pendientes en el código").


<!-- [Claude · MiniReto 5] Encabezado agregado; el texto de predicción de abajo es el original. -->
# Minireto 5:


prediccion para las funciones de microreto 5:

totalVendido: para esta función se tendra n*1 operaciones, sinedo  las la cantidad de ventas.

ventaMayor:para esta función se tendra n*2 operaciones, sinedo n las la cantidad de ventas.

totalPorCiudad:para esta función se tendra n*2 operaciones, sinedo n las la cantidad de ventas.

Si n es 10,100,1000 siplemente se multiplica por el numero que se identificó de operaciones dentro de cada funcion y ya se especificó.



<!-- [Claude · MiniReto 5] Desde aquí hasta "Minireto 6": resultados de la medición, comparación con la predicción y clasificación Big O. -->

### Resultados de la medición (MR5)

Operaciones contadas por las funciones instrumentadas de `analitica.js`, con ventas generadas por `generarVentas(n)`:

| n | totalVendidoContado | ventaMayorContado | ventasPorCiudadContado | primeraVenta |
|---|---|---|---|---|
| 100 | 100 | 200 | 200 | 1 |
| 1.000 | 1.000 | 2.000 | 2.000 | 1 |
| 10.000 | 10.000 | 20.000 | 20.000 | 1 |
| 100.000 | 100.000 | 200.000 | 200.000 | 1 |

*(Hoy `medir.js` calcula esta tabla en `resultadosmedir`, pero no la imprime. Ver "Pendientes en el código".)*

### Predicción vs. resultado (MR5)

| Función | Predicción | Resultado | ¿Coincide? |
|---|---|---|---|
| totalVendido | n × 1 | n (100 → 100; 100.000 → 100.000) | ✅ |
| ventaMayor | n × 2 | 2n (una visita + una comparación por venta) | ✅ |
| totalPorCiudad / ventasPorCiudad | n × 2 | 2n | ✅ (se midió `ventasPorCiudad`, no `totalPorCiudad`) |
| primeraVenta | (no se predijo) | siempre 1 | — |

Cuando n se multiplica por 10, las operaciones de las tres funciones lineales también se multiplican por 10 (100 → 1.000 → 10.000 → 100.000). La de `primeraVenta` no cambia.

### Clasificación Big O (MR5)

- **totalVendido → O(n).** Un solo `for...of` que visita cada venta una vez. Los números lo confirman: n operaciones.
- **ventaMayor → O(n).** Un solo ciclo con una comparación por vuelta: 2n operaciones, y O(2n) se simplifica a O(n) porque se eliminan las constantes.
- **ventasPorCiudad (y totalPorCiudad) → O(n).** Un solo ciclo: 2n operaciones, que es O(n). `totalPorCiudad` también recorre una sola vez y suma en el objeto diccionario, que es O(1) por venta, así que también es O(n).
- **primeraVenta → O(1).** Solo lee `ventas[0]`: con 100 o con 100.000 ventas hace 1 operación.


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

Conclusion:

<!-- [Claude · MiniReto 6] Conclusión para la gerente (la sección estaba vacía). -->
**Para la gerente:** el reporte de clientes recurrentes compara cada venta con todas las demás para ver si el cliente se repite. Por eso, cada vez que el historial se duplica, el trabajo no se duplica: se multiplica por cuatro. Con unos pocos miles de ventas responde en menos de un segundo. Con 100.000 ventas tardó casi un minuto, y con 1.000.000 tardaría más de una hora. El problema no es el computador ni los datos: es la forma en que está construido el reporte. Se puede rehacer para que revise cada venta una sola vez, y eso es lo que se hará en el MiniReto 9.

<!-- [Claude · MiniReto 6] Desde aquí: verificación con 12 datos, traza de 5 ventas, tabla de tiempos, estimación y análisis de includes. -->

### Verificación con los datos del Día 1 (MR6)

`clientesRecurrentes(ventas)` con las 12 ventas devuelve `["C01", "C02", "C03"]` ✅ (comprobado en `verificar.js`, sección MiniReto 6). C01 compró 3 veces (ids 1, 4 y 11), C02 2 veces (2 y 7) y C03 2 veces (3 y 9).

### Traza con 5 ventas (MR6)

Con 5 ventas (posiciones 0 a 4), el ciclo de afuera fija `i` y el de adentro compara con cada `j` desde `i + 1`:

| i | Comparaciones (j) | Cantidad |
|---|---|---|
| 0 | 1, 2, 3, 4 | 4 |
| 1 | 2, 3, 4 | 3 |
| 2 | 3, 4 | 2 |
| 3 | 4 | 1 |
| 4 | (ninguna) | 0 |
| **Total** | | **10** |

Generalización: con n ventas son (n − 1) + (n − 2) + … + 1 = **n × (n − 1) / 2** comparaciones. Con n = 5 son 10, con 100 son 4.950 y con 16.000 son casi 128 millones. Como el término dominante es n²/2, la función es **O(n²)**.

### Tabla de tiempos (MR6)

Son tus mediciones de arriba, organizadas, con la razón entre cada medición y la anterior:

| n | Tiempo | Tiempo ÷ tiempo anterior |
|---|---|---|
| 1.000 | 4,5 ms | — |
| 2.000 | 17,071 ms | 3,8 |
| 4.000 | 62,436 ms | 3,7 |
| 8.000 | 295,699 ms | 4,7 |
| 16.000 | 1.034 ms | 3,5 |

Cada vez que n se duplica, el tiempo se multiplica aproximadamente por **4** (entre 3,5 y 4,7, por el ruido normal de medir). Eso es justo lo que predice O(n²): (2n)² = 4n².

### Estimación con la medición más grande (MR6)

Arriba la estimación se hizo a partir de n = 1.000. Al usar la medición más grande, el error relativo es menor, porque los tiempos fijos pesan poco:

- Tiempo(n) ≈ 1,034 s × (n / 16.000)²
- **100.000 ventas:** 1,034 × (6,25)² ≈ **40 s**. Se midió **57,969 s**: el mismo orden de magnitud, pero más lento de lo estimado. Con datos grandes también influye el `includes` (siguiente punto) y la memoria del computador.
- **1.000.000 ventas:** 1,034 × (62,5)² ≈ 4.039 s ≈ **67 minutos**. Con la base de n = 1.000 da 75 minutos. Las dos estimaciones coinciden en que tardaría **más de una hora**.

### El costo oculto de `includes` (MR6)

`recurrentes.includes(...)` recorre el arreglo `recurrentes` de principio a fin, así que es O(r), con r la cantidad de recurrentes ya encontrados.

- Está **dentro** de los dos ciclos, así que en el peor caso teórico es un tercer ciclo anidado. El límite superior de la función sería **O(n² · r)**, y como r puede crecer hasta cerca de n/2, llega a **O(n³)**.
- En la práctica, gracias al `&&`, `includes` solo se ejecuta cuando los dos clientes coinciden, y la lista `recurrentes` es mucho más pequeña que n. Por eso lo que domina en las mediciones sigue siendo el n² de los dos ciclos. Aun así, con más clientes recurrentes el costo crece más que n², y eso ayuda a explicar por qué 100.000 ventas tardaron más de lo estimado.


<!-- [Claude · MiniReto 7] Sección nueva completa. -->
# Minireto 7:

## Comprobación con 10.000 ventas (MR7)

En `verificar.js` (sección MiniReto 7) se generan 10.000 ventas y se comparan las dos versiones para las cuatro ciudades. Las cuatro dan **exactamente el mismo valor** (OK). Con la muestra del Día 1 y Medellín, las dos dan 356.000 (OK).

## Recorridos y arreglos intermedios (MR7)

| Versión | Qué hace | Recorridos | Arreglos nuevos | Tiempo | Espacio |
|---|---|---|---|---|---|
| `totalCiudadCadena` | `map` (copia cada venta con la ciudad normalizada) → `filter` (deja las de la ciudad) → `reduce` (suma `valorVenta`) | 3: `map` y `filter` recorren las n ventas; `reduce` recorre solo las filtradas (k) | 2: el del `map` (n objetos copiados con `...venta`) y el del `filter` (k ventas) | O(2n + k) = **O(n)** | **O(n)** |
| `totalCiudadUnaPasada` | Un `for...of` que normaliza, compara y suma en una sola vuelta | 1 | 0 | **O(n)** | **O(1)** (solo `totalciudad`) |

Nota: el enunciado describe la cadena con 4 pasos (`map` → `filter` → `map` → `reduce`). En esta versión, el segundo `map` (calcular el valor) se reemplazó por llamar `valorVenta` dentro del `reduce`. Eso ahorra un recorrido y un arreglo intermedio, pero el análisis es el mismo.

## ¿Por qué las dos son O(n)? (MR7)

Big O mide **cómo crece** el trabajo, no cuántas veces exactas se recorre. Los recorridos de la cadena van **uno después del otro**, no uno dentro del otro, así que se **suman**: n + n + k. En el peor caso, cuando todas las ventas son de la ciudad, es 3n. Con la versión de 4 pasos del enunciado sería 4n. Las reglas de simplificación eliminan las constantes: **O(4n) → O(n)** y O(3n) → O(n). Si las ventas se duplican, las dos versiones tardan aproximadamente el doble. La diferencia real entre ellas está en la **memoria**, no en el crecimiento del tiempo.

## Complejidad espacial de todas las funciones del motor (MR7)

Memoria **adicional**, sin contar el arreglo `ventas` que llega como entrada:

| Función | Espacio | Por qué |
|---|---|---|
| valorVenta | O(1) | Una multiplicación, sin estructuras |
| totalVendido, unidadesVendidas | O(1) | Un acumulador |
| ventaMayor | O(1) | Dos variables (valor e índice del mayor) |
| ticketPromedio | O(1) | Un contador; llama a `totalVendido`, que también es O(1) |
| ventasPorCiudad, totalCiudadUnaPasada | O(1) | Un acumulador |
| normalizar | O(1) respecto a n | Crea un texto nuevo del tamaño de la palabra, no del arreglo |
| totalVendidoM, unidadesVendidasM | O(n) | El `map` crea un arreglo intermedio de n números |
| ventasPorCiudadM | O(k), hasta O(n) | El `filter` crea un arreglo con las k ventas de la ciudad |
| totalCiudadCadena | O(n) | `map` crea n objetos copiados y `filter` otro arreglo |
| **totalPorCiudad** | O(c) | Un objeto con una clave por ciudad distinta (c = 4 hoy). Si las ciudades crecieran con los datos, llegaría a O(n) |
| unidadesPorProducto | O(p) | Una clave por producto distinto (p = 5) |
| **topProductosPorValor** | O(p) | El objeto por producto, más el arreglo de `Object.entries`, más el de `slice`, todos de tamaño p |
| ventasDelDia | O(k), hasta O(n) | Devuelve un arreglo nuevo con las ventas del día |
| clientesRecurrentes | O(r), hasta O(n) | El arreglo `recurrentes` |
| totalVendidoContado, ventaMayorContado, ventasPorCiudadContado, primeraVenta | O(1) | Un objeto contador y variables sueltas |
| generarVentas | O(n) | Construye el arreglo de n ventas (es su objetivo) |

## Decisión: ¿qué versión de totalCiudad se queda en el motor? (MR7)

Se queda **`totalCiudadUnaPasada`**.

- **Recursos:** hace 1 recorrido en lugar de 3 y no crea arreglos intermedios, así que usa O(1) de memoria frente a O(n). El marketplace correrá en un servidor con memoria limitada, y con 1.000.000 de ventas la cadena crearía un millón de objetos copiados solo para sumar. En la medición con 10.000 ventas, la versión de una pasada tardó cerca de la mitad (≈0,56 ms frente a ≈1,23 ms).
- **Legibilidad:** la cadena se lee muy bien, pero la versión de una pasada sigue siendo corta y clara, y usa `normalizar`, que hace explícita la intención. La legibilidad que se pierde es poca comparada con los recursos que se ganan.
- `totalCiudadCadena` se conserva en el código como referencia para el análisis y para `verificar.js`.


<!-- [Claude · MiniReto 8] Sección nueva. -->
# Minireto 8:

## Informe de rendimiento v0.2 (MR8)

<!-- [Claude · MiniReto 8] RENDIMIENTO.md fue escrito por Claude (antes estaba vacío). -->
El informe completo está en `RENDIMIENTO.md`. Contiene la tabla de todas las funciones (qué hacen, tiempo, espacio, justificación y medición con 10.000 ventas), la **Proyección** a 1.000.000 de ventas, los **Riesgos** ordenados y el **Plan de optimización** de `clientesRecurrentes`.

Resumen: todas las funciones del motor son O(n) u O(1), **excepto `clientesRecurrentes`, que es O(n²)**. Es el mayor riesgo: con 1.000.000 de ventas pasaría de una hora, mientras que el resto tarda menos de un segundo. La idea de mejora es guardar los clientes ya vistos en una estructura que responda "¿ya lo vi?" en un solo paso, en lugar de volver a recorrer las ventas.

## Revisión de un compañero (MR8)

<!-- [Claude · MiniReto 8] Esta parte la tienes que hacer tú: pídele a un compañero que lea RENDIMIENTO.md y anota aquí su observación y tu respuesta. -->
- **Compañero:** _(pendiente)_
- **Observación:** _(pendiente)_
- **Mi respuesta:** _(pendiente)_


<!-- [Claude] Sección nueva: lo que solo puedes cambiar tú en el código. Claude no modificó ningún archivo de código existente. -->
# Pendientes en el código (los hace Juanes)

1. **`analitica.js`, línea 204 (MR7):** el `return` de `totalCiudadUnaPasada` usa un nombre de variable distinto al declarado. Mientras siga así, **ningún archivo que importe `analitica.js` corre** (`reporte.js`, `verificar.js`, `medir.js`).
2. **`analitica.js`, línea 207 (MR7):** el `console.log(totalCiudadUnaPasada(ventas, "Medellín"))` se ejecuta cada vez que otro archivo hace `require("./analitica")`. Por eso sale un `356000` suelto antes del reporte. Conviene quitarlo o moverlo a `verificar.js`.
3. **`analitica.js`, `module.exports`:** `verificar.js` y `reporte.js` necesitan que se exporten también estas funciones: `valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, totalVendidoM, unidadesVendidasM, ventasPorCiudadM, ventasDelDia, totalCiudadCadena, totalCiudadUnaPasada`. Las de hoy se mantienen.
4. **`ventaMayor` (MR2):** devolver `null` cuando el arreglo está vacío.
5. **`ticketPromedio` (MR2 y MR4, error 2):** devolver `0` cuando no hay ventas válidas.
6. **`medir.js` (MR5):** imprimir `resultadosmedir` con `console.table`. Moodle pide además que las funciones instrumentadas *reciban* el objeto contador como parámetro y que se mida `totalPorCiudad`.
7. **Commits:** hacer un commit identificado como **v0.1** (MR4) y otro como **v0.2** (MR8).

Cuando los puntos 4 y 5 estén listos, las tres líneas DIFERENTE de `verificar.js` deben pasar a OK.
