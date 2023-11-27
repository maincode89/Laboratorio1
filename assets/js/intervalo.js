
window.onload = function()
{
    calcularIntervalo();
}

loadJSON(function(response) {
    // Parse JSON string into object
    datos = JSON.parse(response);
  });
  
  function loadJSON(callback) {   
  
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'assets/JSON/dbProductosVentas.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
  }

function calcularIntervalo()
{
    let totalVentas = 0;
    let valorZ = 2.33;
    let muestra = Object.keys(datos).length;
    let desviacionEstandarSuma = 0;

    // start list results
    let html = "<table class='resultados'>";

    // inserta promedio
    html  += "<tr>";

    for (var i = 0; i < Object.keys(datos).length; i++) {
            totalVentas += datos[i].Ventas;
    }

    let promedio = totalVentas / muestra;

        html  += "<td>Media muestral / Promedio</td><td>" + promedio.toFixed(4) + "</td>";

    html += "</tr>";

    // insert Desviación estandar muestral
    html  += "<tr>";

    for (var i = 0; i < Object.keys(datos).length; i++) {
        desviacionEstandarSuma += Math.pow((datos[i].Ventas - promedio),2);
    }
    
    let desviacionEstandarDivision = desviacionEstandarSuma / (muestra - 1);
    let desviacionEstandarRaiz = Math.sqrt(desviacionEstandarDivision);
    
    html  +="<td>Desviación estandar muestral</td><td>" + desviacionEstandarRaiz.toFixed(4) + "</td>";
    html += "</tr>";
    
    // insert de la muestra
    html  += "<tr>";
    html  += "<td>N</td><td>" + muestra + "</td>";
    html += "</tr>";

    // insert Error estandar
    html  += "<tr>";

    let errorEstandar = desviacionEstandarRaiz / Math.sqrt(muestra);
    html  += "<td>Error estandar SE</td><td>" + errorEstandar.toFixed(4) + "</td>";
    html += "</tr>";

    // insert valor Z
    html  += "<tr>";
    html  += "<td>Z (98%)</td><td>" + valorZ + "</td>";
    html += "</tr>";

    // insert Límite inferior
    html  += "<tr>";

    let limiteInferior = promedio - valorZ * errorEstandar;

    html  += "<td>Intervalo de confianza (Límite inferior)</td><td>" + limiteInferior.toFixed(4) + "</td>";
    html += "</tr>";

    // insert Límite superior
    html  += "<tr>";

    let limiteSuperior = promedio + valorZ * errorEstandar;

    html  += "<td>Intervalo de confianza (Límite inferior)</td><td>" + limiteSuperior.toFixed(4) + "</td>";
    html += "</tr>";

    // end of table
    html += "</table>";

    html += "<div class='resultadoIntervalo d-flex justify-content-center'>" + limiteInferior.toFixed(4) + " &lt; &micro; &gt; " + limiteSuperior.toFixed(4) + "</div>";

    // add table to the empty div
    document.getElementById("infoTable").innerHTML = html;
}

