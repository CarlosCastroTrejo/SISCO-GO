window.onload = function () 
{
    
    var resultados=[];
    var tweetsNegativos=[];
    var tweetsPositivos=[];
    var tweetsNeutros=[];

   


    $.post("http://192.168.64.2/myPHP/grafica.php",function (data)
    {
        resultados = data;
        
        for (i = 0; i < resultados.length; i+=3) 
        {
            tweetsPositivos.push(parseInt(resultados[i],10));
            tweetsNeutros.push(parseInt(resultados[i+1],10));
            tweetsNegativos.push(parseInt(resultados[i+2],10));
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
                    title: "Número de tuits",
                    crosshair: {
                        enabled: false
                    }
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
                    dataPoints: [
                        { x: new Date(2017, 0, 3), y: 500},
                        { x: new Date(2017, 0, 4), y: 500},
                        { x: new Date(2017, 0, 5), y: 43},
                        { x: new Date(2017, 0, 6), y: 65 },
                        { x: new Date(2017, 0, 7), y: 54 },
                        { x: new Date(2017, 0, 8), y: 693 },
                        { x: new Date(2017, 0, 9), y: 34 },
                        { x: new Date(2017, 0, 10), y: 663 },
                        { x: new Date(2017, 0, 11), y: 69 },
                        { x: new Date(2017, 0, 12), y: 673 },
                        { x: new Date(2017, 0, 13), y: 456 },
                        { x: new Date(2017, 0, 14), y: 162 },
                        { x: new Date(2017, 0, 15), y: 321 },
                        { x: new Date(2017, 0, 16), y: 390 }
                    ]
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
                    dataPoints: [
                        { x: new Date(2017, 0, 3), y:  10},
                        { x: new Date(2017, 0, 4), y: 500},
                        { x: new Date(2017, 0, 5), y: 34},
                        { x: new Date(2017, 0, 6), y: 65 },
                        { x: new Date(2017, 0, 7), y: 54 },
                        { x: new Date(2017, 0, 8), y: 693 },
                        { x: new Date(2017, 0, 9), y: 34 },
                        { x: new Date(2017, 0, 10), y: 663 },
                        { x: new Date(2017, 0, 11), y: 69 },
                        { x: new Date(2017, 0, 12), y: 673 },
                        { x: new Date(2017, 0, 13), y: 456 },
                        { x: new Date(2017, 0, 14), y: 162 },
                        { x: new Date(2017, 0, 15), y: 321 },
                        { x: new Date(2017, 0, 16), y: 390 }
                    ]
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
                    dataPoints: [
                        { x: new Date(2017, 0, 3), y: 12 },
                        { x: new Date(2017, 0, 4), y: 745 },
                        { x: new Date(2017, 0, 5), y: 699 },
                        { x: new Date(2017, 0, 6), y: 43 },
                        { x: new Date(2017, 0, 7), y: 734 },
                        { x: new Date(2017, 0, 8), y: 2 },
                        { x: new Date(2017, 0, 9), y: 123 },
                        { x: new Date(2017, 0, 10), y: 141 },
                        { x: new Date(2017, 0, 11), y: 23 },
                        { x: new Date(2017, 0, 12), y: 943 },
                        { x: new Date(2017, 0, 13), y: 954 },
                        { x: new Date(2017, 0, 14), y: 45 },
                        { x: new Date(2017, 0, 15), y: 239 },
                        { x: new Date(2017, 0, 16), y: 459 }
                    ]
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