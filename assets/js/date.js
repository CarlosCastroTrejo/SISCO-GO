$(document).ready(function(){
    $("#registros").on('click', '#register' ,function(event){
            event.preventDefault();
            var dateIni = $("#fechaInicio").val();
            var dateFin = $("#fechaFin").val();
            var desc = $("#descripcion").val();
            
            $.post("http://192.168.64.2/myPHP/dates.php", {inicio: dateIni , fin: dateFin,descripcion:desc}, function (data)
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