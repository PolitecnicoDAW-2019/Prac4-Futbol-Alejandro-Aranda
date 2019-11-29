<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');

require_once './oConexion.class.php';
$player= json_decode($_POST['body']);
$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
//'data:image/'.';base64,'.base64_encode($players->PICTURE),
file_put_contents('../images/'.$player->namePicture,base64_decode($_POST['picture']));
$stmtSelect= $oConni->prepare("UPDATE PLAYERS SET NAME=?, ALIAS=?, CLUB=?, BIRTHDATE=?, PICTURE=?,ID_POSITION=? WHERE ID =?");
$stmtSelect->bind_param('sssssss',$player->name,$player->alias,$player->club,$player->birthdate, $player->namePicture,$player->idPosition,$player->id);
$stmtSelect->execute();
echo json_encode(["status"=>"ok"]);