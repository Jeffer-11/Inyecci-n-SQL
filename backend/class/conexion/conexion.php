<?php
class conexion {
    private $servidor = "localhost";
    private $usuario = "root";
    private $contrasena = "";
    private $basededatos = "usuarios";
    private $puerto = "3306";
    protected $connection;


    // Conexión a la base de datos con PDO
    //PDO (PHP Data Objects) es una extensión en PHP que proporciona una interfaz para acceder a bases de datos. 
    //PDO es su soporte para consultas preparadas. 
    //Estas consultas ayudan a prevenir inyecciones SQL al separar la lógica de la consulta de los datos proporcionados por el usuario.
    function __construct() 
    {
        $dsn = "mysql:host=$this->servidor;dbname=$this->basededatos;port=$this->puerto;charset=utf8";
        try {
            $this->connection = new PDO($dsn, $this->usuario, $this->contrasena);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Conexión fallida: " . $e->getMessage();
            die();
        }
    }

    // Obtiene datos usando consultas preparadas
    public function obtenerDatos($query, $params = []) {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        $resultArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->convertirUTF8($resultArray);
    }

    // Convierte el resultado a UTF-8
    private function convertirUTF8($array){
        array_walk_recursive($array, function(&$item, $key){
            if (!mb_detect_encoding($item, 'utf-8', true)) {
                $item = utf8_encode($item);
            }
        });
        return $array;
    }
}