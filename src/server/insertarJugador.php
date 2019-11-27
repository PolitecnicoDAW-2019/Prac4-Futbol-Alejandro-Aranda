<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');

require_once './oConexion.class.php';
$player= json_decode($_POST['body']);
$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
//'data:image/'.';base64,'.base64_encode($players->PICTURE),
$stmtSelect= $oConni->prepare("INSERT INTO PLAYERS (NAME, ALIAS, CLUB, BIRTHDATE, PICTURE,ID_POSITION) VALUES (?,?,?,?,?,?)");
$stmtSelect->bind_param('ssssss',$player->name,$player->alias,$player->club,$player->birthdate, base64_decode($player->picture),$player->idPosition);
$stmtSelect->execute();
if($stmtSelect->affected_rows<=0){
    echo json_encode(["status"=>$stmtSelect->errno." ".$stmtSelect->error]);
}
else{
    echo json_encode(["status"=>"ok",'lastId'=>$oConni->insert_id]);
}
