window.onload = function () 
{
    
    $.post("http://192.168.64.2/myPHP/menu.php",function (data)
    {
        var resultados=data;
        if(resultados==1){
            
            document.getElementById("admin1").style.display = "none"; 
            document.getElementById("admin2").style.display = "none"; 
            document.getElementById("admin3").style.display = "none"; 
        }else{

        }
        
    });

}


