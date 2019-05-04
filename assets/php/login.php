<?php
$mysqli = new mysqli("localhost", "root", "", "SISCO-GO");
$mysqli->set_charset("utf8");
$usuario = $_REQUEST['usuario'];
$contra = $_REQUEST['contra'];
if ($mysqli->connect_errno) {
  echo "Falló la conexión con MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
if(isset($usuario, $contra))
{
	$sql = "SELECT NombreUsuario from Usuarios where NombreUsuario = '$usuario' AND ContrasenaUsuario = '$contra'";
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
	echo $datos;
}
?>