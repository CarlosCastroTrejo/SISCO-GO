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
	$sql = "SELECT * from matrizConfusion";
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
		    	      array_push($datos,$row['Pos_pos'],$row['Pos_neg'],$row['Pos_neu'],$row['Neg_pos'],$row['Neg_neg'],$row['Neg_neu'],$row['Neu_pos'],$row['Neu_neg'],$row['Neu_neu']);

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