$(document).ready(function(){
    $("#sistema").on('click', '#login' ,function(event){
            event.preventDefault();
            var usr = $("#usuario").val();
            var psw = $("#contra").val();
    
            $.post("http://localhost/login.php",{usuario: usr , contra: psw}, function (data){
                var resultado = data;
                alert(resultado);
                alert(jQuery.type(resultado));
                if(resultado > 0){
                    window.location.href = "home.html";
                }else{
                    alert("usuario o contrasena incorrectos");
                }
            });	
        });
    });