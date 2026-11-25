<!-- [Claude · MiniReto 4 · 24/11/2026] Documentación del proyecto agregada por Claude arriba. Tus notas personales quedaron intactas más abajo, en la sección "Notas propias"; cuando quieras, muévelas a otro archivo. -->

# Café Origen · Motor de analítica

Motor de analítica de ventas para **Café Origen**, una tostadora de café de especialidad de Medellín. Proyecto del módulo Algoritmia 2 (Riwi), hecho en JavaScript con Node.js.

El motor carga el historial de ventas y responde preguntas de negocio por consola. Además incluye herramientas para medir su rendimiento cuando crecen los datos.

**Versión actual: v0.2** (Día 2: análisis de rendimiento con Big O).

## Cómo ejecutarlo

Requisitos: [Node.js](https://nodejs.org) (versión LTS) y Git.

```bash
git clone https://github.com/jualvarezl20/cafe-origen-analitica.git
cd cafe-origen-analitica

node src/reporte.js     # Reporte de negocio v0.1
node src/verificar.js   # Pruebas: ciclo vs. método, casos borde y errores corregidos
node src/explorar.js    # Exploración de los 12 registros de la muestra
node src/medir.js       # Medición de operaciones y tiempos (tarda ~1 min por clientesRecurrentes)
```

## Preguntas que responde

- ¿Cuánto se vendió en total, cuántas unidades salieron y cuál es el ticket promedio?
- ¿Cuál fue la venta más grande?
- ¿Cuánto se vendió en cada ciudad?
- ¿Cuántas unidades se vendieron de cada producto?
- ¿Cuáles son los 3 productos que más dinero generaron?
- ¿Cómo le fue a un día concreto (con o sin ventas)?
- ¿Qué clientes compraron más de una vez?
- ¿Cuánto trabajo hace cada función cuando los datos crecen? (ver `RENDIMIENTO.md`)

## Estructura del proyecto

```
cafe-origen-analitica/
├── src/
│   ├── datos.js        # Las 12 ventas de la muestra (arreglo de objetos)
│   ├── analitica.js    # Funciones de análisis (MiniRetos 2 a 7)
│   ├── explorar.js     # Exploración de los datos (MR1)
│   ├── verificar.js    # Pruebas con resultados OK / DIFERENTE (MR3 en adelante)
│   ├── reporte.js      # Reporte de negocio por consola (MR4)
│   ├── generador.js    # Genera n ventas al azar para medir (MR5)
│   └── medir.js        # Cuenta operaciones y mide tiempos (MR5 y MR6)
├── bitacora.md         # Planes, trazas, casos borde, depuración y análisis
├── RENDIMIENTO.md      # Informe de rendimiento v0.2 (MR8)
└── README.md
```

## Versiones

- **v0.1 (Día 1):** indicadores, agrupaciones, rankings y reporte por consola.
- **v0.2 (Día 2):** generador de datos, conteo de operaciones, mediciones de tiempo e informe de rendimiento.

---

# notas propias (borrar)

<!-- [Claude] Desde aquí, todo es texto original de Juanes, sin cambios. -->

para una funcion de flecha: La idea es crear una contante, que sería el nombre de la función, luego se igualaría a los parametros, que pueden ser uno o mas, estón vas dentro de parentesis y luego la fluecha igual que me dice que quiero que retorne.

para que pueda usar el .map o reuce o lo que sea parecido, lo que se hace definir la lista y ponerle .map o la funcion, se abre parentesis y se define los parametros igua lque en la otra función , se agrega la flecha y se indica que se quiere arrastrar, el parametro del map es como el elemnto por elemento, por ejemplo ventas y su parametro para recorrer es venta.

para el reduce, es parecido, se pone .reduce y se abren 2 parentesis, el primero para toda la funcion y el segundo para los parametros que posteriomente serán el acumulador y lo que vamos a sumar, en este caso ya se definen, cunado le hacemos el. reduce al map, el segundo parametro ya está tomando el resultado del map, ya que reduce comvina los elemntos de una lista, entonces comienza a sumar y lo ponemos en el contador y luego se pone una coma y se coloca el valor inicial del contador.


primero creo una lista vacia
creo una una funcion con un ciclo for of
recorrer la lista existente y scaar los parametros de ciudad, normalizarlos y meterlos en la lista vacia
luego hacer un condicianal que diga que si coinciden sumen el total de la venta y la agregue al paramero de la list



decir cuantos productos y que me muestre el ranking:

tengo que sacar los valores de producto y precio y almacenarlos en un objeto.

con objetos.entries los convierto en lista para poder usar sort

tengo que organizar con sort (a-b)=>(precio menor-precio mayor)


resumen de las funciones aprendidas:

1. .map creo una nueva lista de objetos seleccionando por columnas
2. .filter lo mismo que la de arriba pero con filas
3. .sort ordena elemntos de una lista (a,b)=>a[1]-b[1]
3. .slice  saca una parte de la lista (valor unicial,valor final)
4. .reduce acumula, se usa (acumulador, variable)
5. objet.entries toma un objeto y lo vuelve una lista por pares.


necesito, que recorra el arreglo, que identifique cuales son medellin y sumarlos 

