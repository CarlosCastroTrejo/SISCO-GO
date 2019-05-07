window.onload = function () 
{
   
    $.post("http://192.168.64.2/myPHP/matrizConfusion.php",function (data)
    {
        resultados = data;
        
        if(resultados.length<=0)
        {
            swal({
                title: "Error",
                text: "No existen datos en la base de datos",
                icon: "error",
                button: "Aceptar"
              });
        }else
        {

            for ( i = 0; i < resultados.length; i+=3) 
            {
                
                
            }



            document.getElementById('Pos_pos').innerHTML = resultados[0];
            document.getElementById('Pos_neu').innerHTML = resultados[2];
            document.getElementById('Pos_neg').innerHTML = resultados[1];
            document.getElementById('Neu_pos').innerHTML = resultados[3];
            document.getElementById('Neu_neu').innerHTML = resultados[5];
            document.getElementById('Neu_neg').innerHTML = resultados[4];
            document.getElementById('Neg_pos').innerHTML = resultados[6];
            document.getElementById('Neg_neu').innerHTML = resultados[8];
            document.getElementById('Neg_neg').innerHTML = resultados[7];            

        }
            
       
    },"json");	

}