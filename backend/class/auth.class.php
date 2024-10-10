<?php
require_once "class/conexion/conexion.php";
require_once "class/respuestas.php";


//La clase auth hereda de la clase conexion,puede utilizar todos sus métodos para interactuar con la base de datos.
class auth extends conexion {
    //$json, este contiene los datos de inicio de sesión en formato JSON
    public function login($json)
    {
        $_respuestas = new respuestas;
        $datos = json_decode($json, true);

    //Aquí se verifica si el JSON recibido contiene tanto el usuario como la contrasena.
        if (!isset($datos["usuario"]) || !isset($datos["contrasena"])) {
            return $_respuestas->error_400();
        } else {
            $usuario = $datos["usuario"];
            $contrasena = $datos["contrasena"];

            // Consulta con parámetro preparado para obtener todos los usuarios con ese nombre
            $query = "SELECT * FROM registros WHERE usuarioP = :usuario";
            $parametros = [':usuario' => $usuario];
            $datosUsuario = parent::obtenerDatos($query, $parametros);

            //foreach toma cada elemento de la colección automáticamente.
            if (isset($datosUsuario[0])) {
                foreach ($datosUsuario as $usuarioData) {
                    if ($contrasena === $usuarioData['claveP']) {
                        return ['status' => 'ok', 'result' => ['mensaje' => 'Login exitoso']];
                    }
                }
                return $_respuestas->error_200("Contraseña incorrecta");
            } else {
                return $_respuestas->error_200("Usuario no encontrado");
            }
        }
    }
}
