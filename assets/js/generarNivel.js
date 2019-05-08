$(document).ready(function(){
    $("#seccion").on('click', '#generar' ,function(event){
            event.preventDefault();
            $.post("http://192.168.64.2/myPHP/generarNivel.php", function (data)
            {
                var resultado = data;
                alert(resultado);

                if(resultado==1)
                {
                    swal({
                        title: "Éxito",
                        text: "Completado exitosamente",
                        icon: "success",
                        button: "Aceptar"
                      })
                }else
                {
                    swal({
                        title: "Error",
                        text: "Usuario o contraseña incorrecta",
                        icon: "error",
                        button: "Aceptar"
                      });
                }
            });	
        });
    });