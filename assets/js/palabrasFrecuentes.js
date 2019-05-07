window.onload = function () 
{
    CanvasJS.addColorSet("greenShades",["#2F4F4F","#008080","#2E8B57","#3CB371","#90EE90"]);

    var resultados=[];
  
    var palabrasRepetidas=[];
   


    $.post("http://192.168.64.2/myPHP/palabrasFrecuentes.php",function (data)
    {
        resultados = data;
        
        for ( i = 0; i < resultados.length; i+=2) 
        {
            palabrasRepetidas.push({y:parseInt(resultados[i+1],10),label: resultados[i]})
        }
        
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
            var chart = new CanvasJS.Chart("chartContainer", {
                colorSet: "greenShades",
                animationEnabled: true,
                theme: "light2", 
                title:{
                    text: "Graph",
                    fontColor:"white"
                },
                axisY: {
                    title: "Número Repeticiones",
                    margin: 10
                },
                data: [{        
                    type: "column",  
                    showInLegend: true, 
                    legendMarkerColor: "#2F4F4F",
                    legendText: "Palabras",
                    dataPoints: palabrasRepetidas
                }]
            });
            chart.render();
        }
       
    },"json");	

}