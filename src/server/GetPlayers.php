<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');

require_once './oConexion.class.php';
$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmtSelect= $oConni->query("SELECT PLAYERS.ID, NAME, ALIAS, CLUB, BIRTHDATE, PICTURE, DESCRIPTION  FROM PLAYERS INNER JOIN POSITIONS ON PLAYERS.ID_POSITION = POSITIONS.ID");
while ($players=$stmtSelect->fetch_object()){
    $fileExt=pathinfo($players->PICTURE,PATHINFO_EXTENSION);
    $playerss[]=['id'=>$players->ID,'name'=>$players->NAME,'alias'=>$players->ALIAS,'club'=>$players->CLUB,'birthdate'=>$players->BIRTHDATE,'picture'=>'data:image/'.';base64,'.base64_encode($players->PICTURE),'position'=>$players->DESCRIPTION];
}
echo json_encode($playerss);
