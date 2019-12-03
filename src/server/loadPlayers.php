<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');

require_once './oConexion.class.php';
$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmtSelect= $oConni->query("SELECT PLAYERS.ID,POSITIONS.ID as IDPOSITION, NAME, ALIAS, CLUB, BIRTHDATE, PICTURE, DESCRIPTION  FROM PLAYERS INNER JOIN POSITIONS ON PLAYERS.ID_POSITION = POSITIONS.ID");
while ($players=$stmtSelect->fetch_object()){
    $playerss[]=['id'=>$players->ID,'name'=>$players->NAME,'alias'=>$players->ALIAS,'club'=>$players->CLUB,'birthdate'=>$players->BIRTHDATE,'namePicture'=>$players->PICTURE,'selectPosition'=>$players->DESCRIPTION,'idPosition'=>$players->IDPOSITION];
}
echo json_encode($playerss);

/*
ini_set('error_reporting', E_ALL^E_WARNING^E_NOTICE);
ini_set('display_errors', 'on');

require_once "./oConexion.class.php";

$oConexion = new oConexion('mysql', 'docker', 'root', 'tiger');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();

$player = json_decode($_POST['player']);

echo json_encode(system('ls -la /var/www/html'));
*/