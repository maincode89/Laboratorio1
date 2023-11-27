
window.onload = function()
{
    calcularHipotesis();
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

function calcularHipotesis()
{
    let totalVentas = 0;
    let muestra = Object.keys(datos).length;
    let promedioPoblacional = 17500000;
    let desviacionEstandarSuma = 0;
    let significancia = 1.64;

    for (var i = 0; i < Object.keys(datos).length; i++) {
        totalVentas += datos[i].Ventas;
    } 

    let promedio = totalVentas / muestra;

    // start list results
    let html = "<table class='resultados'>";

    html  += "<tr>";

        html  += "<td>H<sub>0</sub> &micro; &lt=</td><td>" + promedioPoblacional + "</td>";

    html += "</tr>";

    html  += "<tr>";

        html  += "<td>H<sub>A</sub> &micro; &gt</td><td>" + promedioPoblacional + "</td>";

    html += "</tr>";

    html  += "<tr>";

        html  += "<td>&alpha; = 5%</td><td> Z = " + significancia + "</td>";

    html += "</tr>";

    // insert de la muestra
    html  += "<tr>";
    html  += "<td>N</td><td>" + muestra + "</td>";
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

    // inserta T
    html  += "<tr>";

    let valorT = (promedio - promedioPoblacional) / (desviacionEstandarRaiz/Math.sqrt(muestra));

        html  += "<td>Z</td><td>" + valorT.toFixed(4) + "</td>";

    html += "</tr>";

    // end of table
    html += "</table>";

    if(valorT.toFixed(4) <= significancia) {
        html += "<div class='resultadoIntervalo d-flex justify-content-center'>Z &lt;= " + significancia + ". La hipotesis es acertada</div>";
    } else {
        html += "<div class='resultadoIntervalo d-flex justify-content-center'>Z &gt; " + significancia + ". La hipotesis no es acertada</div>";
    }

    // add table to the empty div
    document.getElementById("infoTable").innerHTML = html;
}

