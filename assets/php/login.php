<?php
$mysqli = new mysqli("localhost", "root", "", "SISCO-GO");
$mysqli->set_charset("utf8");
$usuario = 'carlos';//$_REQUEST['usuario'];
$contra = 'hola';//$_REQUEST['contra'];

$salt = md5($contra);
$encriptado = crypt($contra, $salt);
$encriptado=substr($encriptado, 0, 12);


if ($mysqli->connect_errno) {
    echo "Falló la conexión con MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
if(isset($usuario, $contra))
{
	$sql = "SELECT NombreUsuario from Usuarios where NombreUsuario = '$usuario' AND ContrasenaUsuario = '$encriptado'";
	if(!$result = $mysqli->query($sql))
  {
      die($mysqli->error);
  }else
  {
      if(!$result->num_rows==0)
      {
			     while($row = $result->fetch_assoc())
           {
		    	      $datos = 1;
			     }
			     $result->free();
		   }else
       {
         $sql = "SELECT NombreAdministrador from Administrador where NombreAdministrador = '$usuario' AND ContrasenaAdministrador = '$contra'";
         if(!$result = $mysqli->query($sql))
         {
             die($mysqli->error);
         }else
         {
             if(!$result->num_rows==0)
             {
                  while($row = $result->fetch_assoc())
                  {
                       $datos = 2;
                  }
                  $result->free();
              }else
              {
                   $datos = 0;
              }
         }
		   }
	}

  if($datos==1){
    $sql = "UPDATE Usuarios SET EstatusUsuario=1 WHERE NombreUsuario='$usuario'";
    if(!$result = $mysqli->query($sql))
    {
        die($mysqli->error);
    }else
    {
      $datos=1;
    }

  }else if($datos=2){

    $sql ="UPDATE Administrador SET EstatusAdministrador=1 WHERE NombreAdministrador='$usuario'";
    if(!$result = $mysqli->query($sql))
    {
        die($mysqli->error);
    }else
    {
      $datos=1;
    }


  }

	echo $datos;
}
?>