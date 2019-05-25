window.onload = function() {
  var resultados = [];
  var tweetsNegativos = [];
  var tweetsPositivos = [];
  var tweetsNeutros = [];
  var fecha = [];
  var anio;
  var mes;
  var dia;
  var date;

  var anio2;
  var mes2;
  var dia2;

  var AceptMax = [];
  var AceptMin = [];
  var e = 1.3;
  var CTPos = 0.48461675;
  var CTNeg = -0.554680973;
  var CTNeu = 0.755142663;
  var totalTweets = 0.0;
  var TPos = 0.0;
  var TNeg = 0.0;
  var TNeu = 0.0;
  var AMin = 0.0;
  var AMax = 0.0;
  var sucesos = [];
  var fechas = [];

  $.post(
    "http://192.168.64.2/myPHP/lineaTiempo.php",
    function(data) {
      resultados = data[0];
      resultados2 = data[1];

      for (i = 0; i < resultados.length; i += 4) {
        tweetsPositivos.push(parseInt(resultados[i], 10));
        tweetsNeutros.push(parseInt(resultados[i + 1], 10));
        tweetsNegativos.push(parseInt(resultados[i + 2], 10));
        anio = resultados[i + 3].substr(0, 4);
        mes = resultados[i + 3].substr(5, 2);
        dia = resultados[i + 3].substr(8, 2);
        date = new Date(anio + "-" + mes + "-" + dia);
        fecha.push(date);
      }

      for (i = 0; i < tweetsPositivos.length; i++) {
        totalTweets =
          tweetsPositivos[i] + tweetsNeutros[i] + tweetsNegativos[i];
        TPos = (tweetsPositivos[i] / totalTweets) * 100;
        TNeg = (tweetsNegativos[i] / totalTweets) * 100;
        TNeu = (tweetsNeutros[i] / totalTweets) * 100;
        AMin = TPos * CTPos - TNeg * CTNeg + TNeu * CTNeu - e;
        AMax = TPos * CTPos - TNeg * CTNeg + TNeu * CTNeu + e;
        AceptMax.push({ x: fecha[i], y: AMax });
        AceptMin.push({ x: fecha[i], y: AMin });
      }

      for (i = 0; i < resultados2.length; i += 3) {
        anio = resultados2[i + 1].substr(0, 4);
        mes = resultados2[i + 1].substr(5, 2);
        dia = resultados2[i + 1].substr(8, 2);
        anio2 = resultados2[i + 2].substr(0, 4);
        mes2 = resultados2[i + 2].substr(5, 2);
        dia2 = resultados2[i + 2].substr(8, 2);

        sucesos.push({
          startValue: new Date(anio + " " + mes + " " + dia),
          endValue: new Date(anio2 + " " + mes2 + " " + dia2),
          label: resultados2[i],
          labelPlacement: "inside",
          labelAlign: "center",
          labelWrap: true,
          labelBackgroundColor: "transparent",
          labelFontColor: "black",
          color: "#d8d8d8"
        });
      }

      if (resultados.length <= 0) {
        swal({
          title: "Error",
          text: "No existen datos en la base de datos",
          icon: "error",
          button: "Aceptar"
        });
      } else {
        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          theme: "light2",
          title: {
            text: "Graph",
            fontColor: "white"
          },
          axisX: {
            valueFormatString: "DD MMM YYYY",
            crosshair: {
              enabled: false,
              snapToDataPoint: true
            },
            margin: 10,
            stripLines: sucesos
          },
          axisY: {
            title: "Nivel de aceptación",
            valueFormatString: "#0.##",
            suffix: "%",
            crosshair: {
              enabled: false
            },
            margin: 10
          },
          toolTip: {
            shared: true,
            enabled: false
          },
          legend: {
            cursor: "pointer",
            verticalAlign: "bottom",
            horizontalAlign: "center",
            dockInsidePlotArea: false,
            itemclick: toogleDataSeries,
            fontSize: 15
          },
          data: [
            {
              type: "spline",
              showInLegend: true,
              name: "Aceptación maxima",
              lineColor: "#93B52D",
              markerColor: "#93B52D",
              markerType: "circle",
              lineDashType: "solid",
              xValueFormatString: "DD MMM, YYYY",
              color: "#93B52D",
              dataPoints: AceptMax
            },
            {
              type: "spline",
              showInLegend: true,
              name: "Aceptación minima",
              lineColor: "#FF5A40",
              markerColor: "#FF5A40",
              markerType: "circle",
              lineDashType: "solid",
              xValueFormatString: "DD MMM, YYYY",
              color: "#FF5A40",
              dataPoints: AceptMin
            }
          ]
        });
        chart.render();

        function toogleDataSeries(e) {
          if (
            typeof e.dataSeries.visible === "undefined" ||
            e.dataSeries.visible
          ) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          chart.render();
        }
      }
    },
    "json"
  );
};
