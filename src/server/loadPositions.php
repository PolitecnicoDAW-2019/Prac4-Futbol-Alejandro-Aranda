<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');

require_once './oConexion.class.php';
$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmtSelect= $oConni->query("SELECT * FROM POSITIONS");
while ($position=$stmtSelect->fetch_object()){
    $positions[$position->DESCRIPTION]=$position->ID;
}
echo json_encode($positions);
