
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
    let totalLacteos = 0;
    let totalVerduras = 0;
    let totalCarnes = 0;
    let totalBebidas = 0;
    let totalViveres = 0;
    let valorZ = 2.33;
    let muestra = 5;

    // start list results
    let html = "<table class='resultados'>";

    // inserta promedio
    html  += "<tr>";

    for (var i = 0; i < Object.keys(datos).length; i++) {
        if(datos[i].Productos == 'Productos Lácteos') {
            totalLacteos += datos[i].Ventas;
        } else if (datos[i].Productos == 'Verduras') {
            totalVerduras += datos[i].Ventas;
        } else if (datos[i].Productos == 'Carnes') {
            totalCarnes += datos[i].Ventas;
        } else if (datos[i].Productos == 'Bebidas') { 
            totalBebidas += datos[i].Ventas;
        } else if (datos[i].Productos == 'Víveres') { 
            totalViveres += datos[i].Ventas;
        }
    }

    let promedio = (totalLacteos + totalVerduras + totalCarnes + totalBebidas + totalViveres) / muestra;

        html  += "<td>Media muestral / Promedio</td><td>" + promedio + "</td>";

    html += "</tr>";

    // insert Desviación estandar muestral
    html  += "<tr>";

    let desviacionEstandarSuma = Math.pow((totalLacteos - promedio),2) + Math.pow((totalVerduras - promedio),2) + Math.pow((totalCarnes - promedio),2) + Math.pow((totalBebidas - promedio),2) + Math.pow((totalViveres - promedio),2);
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

    let errorEstandar = desviacionEstandarRaiz / Math.sqrt(5);
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

    // add table to the empty div
    document.getElementById("infoTable").innerHTML = html;
}

