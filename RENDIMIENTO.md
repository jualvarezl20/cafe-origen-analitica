# Informe de rendimiento · Motor de analítica Café Origen v0.2

Este documento describe el rendimiento de cada función del motor cuando crece el historial de ventas. **n** es el número de ventas. Las complejidades se justifican con el código de `src/analitica.js`.

**Sobre las mediciones:** la columna "Medición con 10.000 ventas" es el tiempo promedio de cada función con 10.000 ventas de `generarVentas(10000)`, medido por Claude en otro computador (Node.js 22). En tu computador los milisegundos exactos pueden cambiar, pero la proporción entre funciones se mantiene. Los tiempos de `clientesRecurrentes` entre 1.000 y 16.000 ventas son tus mediciones del MiniReto 6.

## 1. Tabla de complejidades

| Función | Qué hace | Tiempo | Espacio | Justificación (código) | Medición con 10.000 ventas |
|---|---|---|---|---|---|
| `valorVenta(venta)` | cantidad × precio de una venta | O(1) | O(1) | Una multiplicación, sin ciclos | ≈0,0003 ms |
| `totalVendido(ventas)` | Suma el valor de todas las ventas | O(n) | O(1) | Un `for...of`; un acumulador | ≈0,09 ms · 10.000 operaciones |
| `unidadesVendidas(ventas)` | Suma las cantidades | O(n) | O(1) | Un `for...of`; un acumulador | ≈0,07 ms |
| `ventaMayor(ventas)` | Devuelve la venta de mayor valor | O(n) | O(1) | Un `for...of` con una comparación por vuelta (2n → O(n)) | ≈0,34 ms · 20.000 operaciones |
| `ticketPromedio(ventas)` | Total ÷ ventas con cantidad > 0 | O(n) | O(1) | Un `for...of` para contar más otro dentro de `totalVendido`: 2n → O(n) | ≈0,08 ms |
| `ventasPorCiudad(ventas, ciudad)` | Total vendido en una ciudad | O(n) | O(1) | Un `for...of`; normaliza y compara en cada vuelta | ≈0,52 ms · 20.000 operaciones |
| `totalVendidoM(ventas)` | Igual que `totalVendido`, con métodos | O(n) | O(n) | `map` (n) + `reduce` (n) = 2n → O(n); el `map` crea un arreglo de n números | ≈0,18 ms |
| `unidadesVendidasM(ventas)` | Igual que `unidadesVendidas`, con métodos | O(n) | O(n) | `map` + `reduce`; arreglo intermedio de n números | ≈0,18 ms |
| `ventasPorCiudadM(ventas, ciudad)` | Igual que `ventasPorCiudad`, con métodos | O(n) | O(k) ≤ O(n) | `filter` (n) + `reduce` (k); el `filter` crea un arreglo con las k ventas de la ciudad | ≈0,54 ms |
| `totalPorCiudad(ventas)` | Total por cada ciudad | O(n) | O(c) | Un `for...of`; leer y escribir en el objeto diccionario es O(1). Una clave por ciudad (c = 4) | ≈1,11 ms |
| `unidadesPorProducto(ventas)` | Unidades por producto | O(n) | O(p) | Un `for...of` y un objeto con una clave por producto (p = 5) | ≈1,45 ms |
| `topProductosPorValor(ventas, k)` | Los k productos que más dinero generaron | O(n + p log p) → O(n) con p fijo | O(p) | Un `for...of` para agrupar (n), luego `sort` sobre p pares (p log p) y `slice` | ≈1,08 ms |
| `ventasDelDia(ventas, fecha)` | Ventas de una fecha | O(n) | O(k) ≤ O(n) | Un `for...of`; devuelve un arreglo nuevo con las ventas del día | ≈0,15 ms |
| `totalVendidoContado`, `ventaMayorContado`, `ventasPorCiudadContado` | Versiones instrumentadas (MR5) | O(n) | O(1) | Un ciclo y un objeto contador | n, 2n y 2n operaciones |
| `primeraVenta(ventas)` | Lee `ventas[0]` | O(1) | O(1) | Acceso por índice | 1 operación |
| `clientesRecurrentes(ventas)` | Clientes con más de una compra | **O(n²)** (cota teórica O(n³) por `includes`) | O(r) ≤ O(n) | Dos ciclos anidados: n(n − 1)/2 comparaciones; además `includes` recorre `recurrentes` dentro de ellos | **≈443 ms** (casi 50 millones de comparaciones) |
| `totalCiudadCadena(ventas, ciudad)` | Total de una ciudad con `map` → `filter` → `reduce` | O(n) | O(n) | 3 recorridos seguidos (2n + k → O(n)); 2 arreglos intermedios, uno con n objetos copiados | ≈1,23 ms |
| `totalCiudadUnaPasada(ventas, ciudad)` | Total de una ciudad en un solo ciclo | O(n) | O(1) | 1 recorrido, 0 arreglos intermedios | ≈0,56 ms |
| `normalizar(palabra)` | `trim().toLowerCase()` | O(1) respecto a n | O(1) respecto a n | Depende del largo de la palabra, no del número de ventas | — |
| `generarVentas(n)` (generador.js) | Crea n ventas al azar | O(n) | O(n) | Un ciclo de n vueltas que llena un arreglo de n ventas | — |

## 2. Proyección para 1.000.000 de ventas

Método: 1.000.000 es **100 veces** 10.000.
- Para una función **O(n)**, el tiempo se multiplica aproximadamente por 100.
- Para una **O(n²)**, se multiplica por 100² = **10.000**.
- Las **O(1)** no cambian.

| Función | 10.000 ventas | Proyección a 1.000.000 |
|---|---|---|
| valorVenta, primeraVenta | ≈0,0003 ms | Igual (O(1)) |
| totalVendido, unidadesVendidas, ticketPromedio | ≈0,07–0,09 ms | ≈7–9 ms |
| ventasDelDia | ≈0,15 ms | ≈15 ms |
| totalVendidoM, unidadesVendidasM | ≈0,18 ms | ≈18 ms |
| ventaMayor | ≈0,34 ms | ≈34 ms |
| ventasPorCiudad, ventasPorCiudadM, totalCiudadUnaPasada | ≈0,5 ms | ≈50–55 ms |
| topProductosPorValor, totalPorCiudad, totalCiudadCadena, unidadesPorProducto | ≈1,1–1,5 ms | ≈110–145 ms |
| **clientesRecurrentes** | ≈443 ms | ≈443 ms × 10.000 ≈ **74 minutos** |

**Comprobación con tus mediciones (MiniReto 6):** con la medición de 16.000 ventas (1,034 s): 1,034 s × (1.000.000 / 16.000)² ≈ 4.039 s ≈ **67 minutos**. Con la de 1.000 ventas: ≈ 75 minutos. Las tres estimaciones coinciden: **más de una hora**. Con 100.000 ventas se midió 57,969 s, cuando la estimación era ≈40 s, así que en la práctica podría ser todavía más lento.

**Conclusión:** con 1.000.000 de ventas, el reporte completo sin `clientesRecurrentes` tarda menos de un segundo. `clientesRecurrentes` solo tarda más de una hora.

## 3. Riesgos (de mayor a menor)

**Criterio:** primero, qué tan rápido crece el **tiempo** cuando crecen los datos (O(n²) es mucho peor que O(n)). Segundo, para el mismo tiempo, cuánta **memoria adicional** usa, porque el servidor del marketplace tiene memoria limitada.

1. **`clientesRecurrentes` · riesgo crítico.** O(n²) en tiempo, con el costo extra de `includes`. Es la única función que no escala: duplicar las ventas cuadruplica el tiempo. No cumple el requisito de responder en menos de un segundo con 100.000 ventas (tardó ~58 s).
2. **`totalCiudadCadena` · riesgo medio.** Tiempo O(n), pero memoria O(n): con 1.000.000 de ventas crea un millón de objetos copiados solo para sumar. Se reemplaza por `totalCiudadUnaPasada` (decisión del MiniReto 7).
3. **`totalVendidoM`, `unidadesVendidasM`, `ventasPorCiudadM`, `ventasDelDia` · riesgo bajo-medio.** Tiempo O(n), pero crean arreglos intermedios o de resultado que crecen con los datos.
4. **`topProductosPorValor` · riesgo bajo.** O(n) mientras los productos sean pocos. Si el catálogo creciera mucho, pesaría el `sort` (p log p).
5. **`totalPorCiudad`, `unidadesPorProducto` · riesgo bajo.** O(n) en tiempo; su memoria depende de cuántas ciudades y productos distintos haya, no de cuántas ventas.
6. **`totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio`, `ventasPorCiudad`, `totalCiudadUnaPasada` · riesgo muy bajo.** O(n) en tiempo y O(1) en memoria: un recorrido y un acumulador.
7. **`valorVenta`, `primeraVenta` · sin riesgo.** O(1).

## 4. Plan de optimización: `clientesRecurrentes` (idea, sin implementar)

**¿Qué trabajo se repite?** Para cada venta, la función vuelve a recorrer todas las ventas siguientes para preguntar lo mismo: "¿este cliente aparece otra vez?". El mismo cliente se compara una y otra vez contra los mismos registros. Además, cada vez que encuentra una coincidencia, recorre `recurrentes` con `includes` para preguntar "¿ya lo anoté?".

**¿Qué información se podría guardar para no buscarla de nuevo?** Los clientes que ya se vieron. Si se recorren las ventas **una sola vez** y se van guardando los clientes vistos en una estructura que responda "¿ya vi a este cliente?" en un solo paso, entonces:
- si el cliente **ya estaba** en los vistos, es recurrente y se anota (también en una estructura que no repita);
- si **no estaba**, se agrega a los vistos.

Así cada venta se visita una vez y cada pregunta cuesta O(1) en promedio. La función pasaría de O(n²) a **O(n)** en tiempo, a cambio de O(n) de memoria para guardar los vistos: se cambia memoria por tiempo. Con 100.000 ventas, debería pasar de ~58 s a milisegundos. Se implementa en el MiniReto 9 (Día 3), donde se estudian las estructuras que permiten esa búsqueda en un paso.
