<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');
define (IMAGES, 'var/www/html/images');

require_once './oConexion.class.php';
$player= json_decode($_POST['body']);
$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmtSelect= $oConni->prepare("INSERT INTO PLAYERS (NAME, ALIAS, CLUB, BIRTHDATE, PICTURE,ID_POSITION) VALUES (?,?,?,?,?,?)");
if($_POST['picture']){
file_put_contents('../images/'.$player->namePicture,base64_decode($_POST['picture']));
}
$stmtSelect->bind_param('ssssss',$player->name,$player->alias,$player->club,$player->birthdate, $player->namePicture,$player->idPosition);
$stmtSelect->execute();
echo json_encode(["status"=>"ok",'lastId'=>$oConni->insert_id]);