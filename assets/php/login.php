<?php
$mysqli = new mysqli("localhost", "root", "", "SISCO-GO");
$mysqli->set_charset("utf8");
$usuario =$_REQUEST['usuario'];
$contra =$_REQUEST['contra'];

$salt = md5($contra);
$encriptado = crypt($contra, $salt);
$encriptado=substr($encriptado, 0, 12);

$tipoUsuario;


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
		    	      $tipoUsuario = 1;
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
                       $tipoUsuario = 2;
                  }
                  $result->free();
              }else
              {
                   $tipoUsuario = 0;
              }
         }
		   }
	}

  if($tipoUsuario==1){
    $sql = "UPDATE Usuarios SET EstatusUsuario=1 WHERE NombreUsuario='$usuario'";
    if(!$result = $mysqli->query($sql))
    {
        die($mysqli->error);
    }else
    {
      $tipoUsuario=1;
    }

  }else if($tipoUsuario=2){

    $sql ="UPDATE Administrador SET EstatusAdministrador=1 WHERE NombreAdministrador='$usuario'";
    if(!$result = $mysqli->query($sql))
    {
        die($mysqli->error);
    }else
    {
      $tipoUsuario=1;
    }


  }

	echo $tipoUsuario;
}
?>
