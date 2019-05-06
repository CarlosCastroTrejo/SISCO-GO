<?php
$mysqli = new mysqli("localhost", "root", "", "SISCO-GO");
$mysqli->set_charset("utf8");
$inicio = $_REQUEST['inicio'];
$fin = $_REQUEST['fin'];
$desc = $_REQUEST['descripcion'];


if ($mysqli->connect_errno) {
    echo "Falló la conexión con MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
if(isset($inicio, $fin,$desc))
{
  $ID="SELECT COUNT(*) as numero from SucesosImportantes";
  if(!$result = $mysqli->query($ID))
  {
      die($mysqli->error);
  }else
  {
      if(!$result->num_rows==0)
      {
			     while($row = $result->fetch_assoc())
           {
             $ID2 = $row['numero'];
			     }
			     $result->free();
		   }else {
         $datos=0;
       }
  }

  $sql = "INSERT INTO SucesosImportantes VALUES ('$ID2','$desc','$inicio','$fin')";
  if(!$result = $mysqli->query($sql))
  {
      die($mysqli->error);
  }else
  {
    $datos=1;
  }

	echo $datos;
}
?>
