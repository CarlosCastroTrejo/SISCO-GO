<?php
$mysqli = new mysqli("localhost", "root", "", "SISCO-GO");
$mysqli->set_charset("utf8");
$usuario = '';
$contra = '';
if ($mysqli->connect_errno) {
  echo "Falló la conexión con MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
if(isset($usuario, $contra))
{
	$sql = "SELECT * from resultadostwitter";
  $datos = array();

	if(!$result = $mysqli->query($sql))
  {
    die($mysqli->error);
  }else
  {
    if(!$result->num_rows==0)
    {
			while($row = $result->fetch_assoc())
      {
        array_push($datos,$row['CantidadTweetPositivos'],$row['CantidadTweetNeutros'],$row['CantidadTweetNegativos'];
			}
			$result->free();
		}else
    {
      $datos = 0;
		}
	}
  echo json_encode($datos);
}
?>
