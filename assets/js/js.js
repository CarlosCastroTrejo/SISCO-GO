$(document).ready(function(){
    $("#sistema").on('click', '#login' ,function(event){
            event.preventDefault();
            var usr = $("#usuario").val();
            var psw = $("#contra").val();
            $.post("http://192.168.64.2/myPHP/index.php", {usuario: usr , contra: psw}, function (data)
            {
                var resultado = data;
                alert(resultado);
                alert(jQuery.type(resultado));
                if(resultado==1)
                {
                    //Usuario normal
                    window.location.href = "home.html";
                }else if(resultado==2)
                {
                    //Usuario administrador
                    window.location.href = "home.html";
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