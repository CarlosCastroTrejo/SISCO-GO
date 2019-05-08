window.onload = function () 
{
    
    var resultados=[];
    var tweetsNegativos=[];
    var tweetsPositivos=[];
    var tweetsNeutros=[];
    var fecha=[];
    var anio;
    var mes;
    var dia;
    var date;

    var Positivos=[];
    var Neutros=[];
    var Negativos=[];
   


    $.post("http://192.168.64.2/myPHP/grafica.php",function (data)
    {
        resultados = data;
        
        for (i = 0; i < resultados.length; i+=4) 
        {
            tweetsPositivos.push(parseInt(resultados[i],10));
            tweetsNeutros.push(parseInt(resultados[i+1],10));
            tweetsNegativos.push(parseInt(resultados[i+2],10));
            anio=resultados[i+3].substr(0,4);
            mes=resultados[i+3].substr(5,2);
            dia=resultados[i+3].substr(8,2);
            date=new Date(anio+"-"+mes+"-"+dia);
            fecha.push(date);
            
        }
        
        for ( i = 0; i < tweetsPositivos.length; i++) 
        {
            Positivos.push({x: fecha[i],y:tweetsPositivos[i]});
            Neutros.push({x:fecha[i],y: tweetsNeutros[i]});
            Negativos.push({x: fecha[i],y: tweetsNegativos[i]});
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
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "Graph",
                    fontColor:"white"
                },
                axisX:{
                    valueFormatString: "DD MMM YYYY",
                    crosshair: {
                        enabled: false  ,
                        snapToDataPoint: true
                    }
                },
                axisY: {
                    title: "Número de tweets",
                    crosshair: {
                        enabled: false
                    },
                    margin: 10
                },
                toolTip:{
                    shared:true
                },  
                legend:{
                    cursor:"pointer",
                    verticalAlign: "bottom",
                    horizontalAlign: "center",
                    dockInsidePlotArea: false,
                    itemclick: toogleDataSeries,
                    fontSize:15
                },
                data: [{
                    type: "line",
                    showInLegend: true,
                    name: "Tweets positivos",
                    lineColor: "#93B52D",
                    markerColor: "#93B52D",
                    markerType: "circle",
                    lineDashType: "solid",
                    xValueFormatString: "DD MMM, YYYY",
                    color: "#93B52D",
                    dataPoints: Positivos
                },
                {
                    type: "line",
                    showInLegend: true,
                    name: "Tweets neutros",
                    lineColor: "#4188D2",
                    markerColor: "#4188D2",
                    markerType: "circle",
                    lineDashType: "solid",
                    xValueFormatString: "DD MMM, YYYY",
                    color: "#4188D2",
                    dataPoints: Neutros
                },
                {
                    type: "line",
                    showInLegend: true,
                    name: "Tweets negativos",
                    lineColor: "#FF5A40",
                    markerColor: "#FF5A40",
                    markerType: "circle",
                    lineDashType: "solid",
                    xValueFormatString: "DD MMM, YYYY",
                    color: "#FF5A40",
                    dataPoints: Negativos
                }]
            });
            chart.render();
            
            function toogleDataSeries(e){
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else{
                    e.dataSeries.visible = true;
                }
                chart.render();
            }
        }
       
    },"json");	

   

}