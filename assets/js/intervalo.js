
window.onload = function()
{
    calcularIntervalo();
}

function calcularIntervalo()
{
    // const elements = Elements.GetElements();
    // const headings = Elements.GetHeadings();
    // const properties = Elements.GetProperties();

    // start list results
    let html = "<table class='resultados'>";

    // insert results
    html  += "<tr>";
    // for(let heading of headings)
    // {
        html  += `<td>Media muestral / Promedio (x)</td><td></td>`;
    // }
    html += "</tr>";

    // insert results
    html  += "<tr>";
    // for(let heading of headings)
    // {
        html  += `<td>Desviación estandar muestral (x)</td><td></td>`;
    // }
    html += "</tr>";
    
    // insert results
    html  += "<tr>";
    // for(let heading of headings)
    // {
        html  += `<td>N</td><td></td>`;
    // }
    html += "</tr>";

    // insert results
    html  += "<tr>";
    // for(let heading of headings)
    // {
        html  += `<td>Error estandar SE</td><td></td>`;
    // }
    html += "</tr>";

    // insert results
    html  += "<tr>";
    // for(let heading of headings)
    // {
        html  += `<td>Z (98%)</td><td></td>`;
    // }
    html += "</tr>";

    // insert results
    html  += "<tr>";
    // for(let heading of headings)
    // {
        html  += `<td>Intervalo de confianza</td><td></td>`;
    // }
    html += "</tr>";

    // end of table
    html += "</table>";

    // add table to the empty div
    document.getElementById("infoTable").innerHTML = html;
}

