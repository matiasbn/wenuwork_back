### Instalación

```
npm install 
```

### Iniciar el servicio

El servicio se conecta a localhost, en el puerto 3000. Se requiere la utilización de MongoDB, al cual se conecta mediante el puerto 27017, creando una base de datos llamada wenu. Una vez que MongoDB este iniciado mediante su daemon ```mongod``` se debe iniciar el servicio REST mediante:

```
node server.js
```

## Del servicio REST

La API permite hacer las siguientes acciones sobre usuarios y autos:
- Crear
- Modificar
- Listar
- Eliminar

Se pide que, mediante parámetros, se pueda hacer una búsqueda de todos los usuarios que posean el MISMO auto, entendiendose por el MISMO AUTO a dos autos que comparten marca, modelo y año.

En la carpeta models se encuentran los modelos de usuarios y autos.

## API

En la carpeta models se pueden encontrar tanto el modelo para usuario como para auto.

# Usuario

- Crear (POST) : exige rut, nombre, marca de auto, modelo de auto y año del auto.
```
http://localhost:3000/usuarios
```

- Modificar (PUT): exige entregar el ID de usuario como parámetro. Requiere lo mismo que crear.
```
http://localhost:3000/usuarios/ID_DE_USUARIO_A_MODIFICAR
```

- Listar (GET)
```
http://localhost:3000/usuarios
```

- Eliminar (DELETE): exige ingresar como parámetro la id del usuario a eliminar.
```
http://localhost:3000/usuarios/ID_DE_USUARIO_A_ELIMINAR
```

# Autos 
- Crear (POST) : exige marca de auto, modelo de auto y año del auto.
```
http://localhost:3000/autos
```

- Modificar (PUT): exige entregar el ID de auto como parámetro. Requiere lo mismo que crear.
```
http://localhost:3000/autos/ID_DE_AUTO_A_MODIFICAR
```

- Listar (GET)
```
http://localhost:3000/autos
```

- Eliminar (DELETE): exige ingresar como parámetro la id del usuario a eliminar.
```
http://localhost:3000/autos/ID_DE_AUTO_A_ELIMINAR
```

- Buscar identico (GET): exige tres parámetros: marca, modelo y year

```
http://localhost:3000/autos?marca=MARCA_BUSCADA&modelo=MODELO_BUSCADO&year=YEAR_BUSCADO
```
