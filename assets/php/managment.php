<?php
$mysqli = new mysqli("localhost", "root", "", "SISCO-GO");
$mysqli->set_charset("utf8");
$usuario = $_REQUEST['usuario'];
$contra = $_REQUEST['contra'];
$accion = $_REQUEST['accion'];
$clase = $_REQUEST['clase'];


$salt = md5($contra);
$encriptado = crypt($contra, $salt);

if ($mysqli->connect_errno) {
    echo "Falló la conexión con MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
if(isset($usuario, $contra,$accion,$clase))
{
  if($accion=="1")
  {
    if($clase=="1")
    {
      $sql = "INSERT INTO Administrador VALUES ('$usuario','$encriptado',0)";
      if(!$result = $mysqli->query($sql))
      {
          $datos=0;
          die($mysqli->error);
      }else
      {
        $datos=1;
    	}

    }else
    {
      $sql = "INSERT INTO Usuarios VALUES ('$usuario','$encriptado',0)";
      if(!$result = $mysqli->query($sql))
      {
          $datos=0;
          die($mysqli->error);
      }else
      {
        $datos=1;
    	}
    }
  }else
  {
    $encriptado=substr($encriptado, 0, 12);
    if($clase=="1")
    {
      $sql = "DELETE FROM Administrador WHERE ContrasenaAdministrador='$encriptado'";
      if(!$result = $mysqli->query($sql))
      {
          $datos=0;
          die($mysqli->error);
      }else
      {
        $datos=1;
    	}

    }else
    {
      $sql = "DELETE FROM Usuarios WHERE ContrasenaUsuario='$encriptado'";
      if(!$result = $mysqli->query($sql))
      {
          $datos=0;
          die($mysqli->error);
      }else
      {
        $datos=1;
    	}
    }
  }
	echo $datos;
}
?>
