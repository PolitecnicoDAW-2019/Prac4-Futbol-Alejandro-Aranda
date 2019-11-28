<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');

require_once './oConexion.class.php';
$idPlayer= json_decode($_POST['body']);
$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmtSelect= $oConni->prepare("DELETE FROM PLAYERS WHERE ID =?");
$stmtSelect->bind_param('s',$idPlayer);
$stmtSelect->execute();
echo json_encode($player);