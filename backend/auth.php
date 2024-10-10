<?php
require_once 'class/auth.class.php';
require_once 'class/respuestas.php';

$_auth = new auth;
$_respuestas = new respuestas;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Manejo de solicitud POST
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $postbody = file_get_contents("php://input");
    $datosArray = $_auth->login($postbody);
    header("Content-type: application/json");
    if (isset($datosArray["result"]["error_id"])) {
        $responseCode = $datosArray["result"]["error_id"];
        http_response_code($responseCode);
    } else {
        http_response_code(200);
    }
    echo json_encode($datosArray);
} else {
    header('Content-type: application/json');
    $datosArray = $_respuestas->error_405();
    echo json_encode($datosArray);
}

?>
