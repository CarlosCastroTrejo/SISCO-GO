$(document).ready(function(){
    $("#seccionSalir").on('click', '#salir' ,function(event){
            event.preventDefault();
            


            $.post("http://192.168.64.2/myPHP/login.php", {usuario: usr , contra: psw}, function (data)
            {
                var resultado = data;
                window.location.href = "login.html";
            });	
            
        });
    });