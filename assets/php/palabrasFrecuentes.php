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
	$sql = "SELECT * FROM PalabrasFrecuentes ORDER BY CantidadRepetidas DESC LIMIT 10";
  $datos=array();
	if(!$result = $mysqli->query($sql))
  {
      die($mysqli->error);
  }else
  {
      if(!$result->num_rows==0)
      {
			     while($row = $result->fetch_assoc())
           {
		    	      array_push($datos,$row['PalabraTweet'],$row['CantidadRepetidas']);
			     }
			     $result->free();
		   }else
       {
         $datos=0;
		   }
	}
  echo json_encode($datos);
}
?>
