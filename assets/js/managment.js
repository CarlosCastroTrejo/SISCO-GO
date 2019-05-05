$(document).ready(function(){
    $("#registros").on('click', '#register' ,function(event){
            event.preventDefault();
            var usr = $("#usuario").val();
            var psw = $("#contra").val();
            var acc = $("#accion").val();
            var claU = $("#claseUsuario").val();

            if(acc=="Registrar nuevo usuario"){
                acc="1";
            }else{
                acc="2";
            }

            if(claU=="Administrador"){
                claU="1";
            }else{
                claU="2";
            }

            
            $.post("http://192.168.64.2/myPHP/managment.php", {usuario: usr , contra: psw,accion:acc,clase:claU}, function (data)
            {
                var resultado = data;
                if(resultado==1)
                {
                    swal({
                        title: "Éxito",
                        text: "Completado exitosamente",
                        icon: "success",
                        button: "Aceptar"
                      })
                }else{
                    swal({
                        title: "Error",
                        text: "Hubo un error en el sistema",
                        icon: "error",
                        button: "Aceptar"
                      })
                }
            });	
        });
    });