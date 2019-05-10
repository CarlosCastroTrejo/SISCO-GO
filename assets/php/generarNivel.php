<?php
$mysqli = new mysqli("localhost", "root", "", "SISCO-GO");
$mysqli->set_charset("utf8");
$usuario = '';
$contra = '';
$tweets=array();

if ($mysqli->connect_errno) {
    echo "Falló la conexión con MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
if(isset($usuario, $contra))
{

	$sql = "SELECT COUNT(*) as negativos from twitter where tipo='negativo'";

	if(!$result = $mysqli->query($sql))
  {
      die($mysqli->error);
  }else
  {
      if(!$result->num_rows==0)
      {
			     while($row = $result->fetch_assoc())
           {
		    	     array_push($tweets,$row['negativos']);
               $datos=1;
			     }
			     $result->free();
		   }else
       {
         $datos=0;
		   }
	}

  $sql = "SELECT COUNT(*) as neutros from twitter where tipo='neutro'";

	if(!$result = $mysqli->query($sql))
  {
      die($mysqli->error);
  }else
  {
      if(!$result->num_rows==0)
      {
			     while($row = $result->fetch_assoc())
           {
		    	     array_push($tweets,$row['neutros']);
			     }
			     $result->free();
		   }else
       {
         $datos=0;
		   }
	}

  $sql = "SELECT COUNT(*) as positivos from twitter where tipo='positivo'";

	if(!$result = $mysqli->query($sql))
  {
      die($mysqli->error);
  }else
  {
      if(!$result->num_rows==0)
      {
			     while($row = $result->fetch_assoc())
           {
		    	     array_push($tweets,$row['positivos']);
               $datos=1;

			     }
			     $result->free();
		   }else
       {
         $datos=0;
		   }
	}

  $suma=(int)$tweets[0]+$tweets[1]+$tweets[2];
  // It insert the query in today's date. For future development should insert the date by user input
  $sql = "INSERT INTO resultadostwitter VALUES ('$tweets[2]','$tweets[1]','$tweets[0]','$suma','2018-11-30 00:00:00')";
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