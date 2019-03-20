# Cronsun Reassign Job

Solución :monkey: a un problema de :monkey::monkey::monkey:! Simple script para re-asignar Jobs en nodos dañados al primero nodo disponible en cronsun

## Problema :monkey:

Al utilizar cronsun en kubernetes, nos encontramos con el siguiente problema... existían momentos en los cuales al ejecutar 
un trabajo `etcd` arrojaba timeouts y dejaba como dañado el nodo donde se ejecutaba dicho trabajo. Luego volvía a agregar el
mismo nodo que había dejado como dañado, pero lo hace con un nuevo uuid. Esto provoca que los trabajos asignados a un nodo,
dejen de ejecutarse silenciosamente.


## Solución :monkey:

Para solucionar lo anterior de manera rápida, porque al aumentar el timeout de `etcd` no funcionó, se nos ocurrió reasignar
los trabajos al nuevo nodo! 🤓 :monkey::monkey::monkey::monkey::monkey:

El script buscará en la api de cronsun los nodos dañandos y el primer nodo disponible. Luego por cada nodo dañado, buscará los trabajos
que tengan dentro de sus reglas de ejecución el nodo dañado y lo reemplazará por el nodo disponible :tada: :tada: :tada:

## Usalo como :monkey:

El script necesita que se especifiquen 3 variables de entorno. La manera más facil es pasar
las variables al ejecutar el script

## Usando con Docker

Primero debemos hacer la build de la imagen y luego executar run!

```bash
docker build -t cronsun-reassign-job .
docker run --env-file .env cronsun-reassign-job
```

o todo junto! :monkey:

````bash
docker build -t cronsun-reassign-job . && docker run --env-file .env cronsun-reassign-job
````


```bash
BASE_URL=http://cronsun.example.com USER=username PASS=pass npm start
```

## TODO para quitar algo lo :monkey:

* [ ] Eliminar nodo dañado
* [ ] Agregar tests
* [ ] Agregar .env
* [ ] Refactorizar el código en `api/index.js`
