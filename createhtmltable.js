
window.onload = function()
{
    createTable1();
}

function createTable1()
{
    const elements = Elements.GetElements();
    const headings = Elements.GetHeadings();
    const properties = Elements.GetProperties();

    // start table and add caption
    let tablehtml = "<table>";

    // insert row of headings
    tablehtml  += "<tr>";
    for(let heading of headings)
    {
        tablehtml  += `<th>${heading}</th>`;
    }
    tablehtml += "</tr>";

    // iterate data and add row of cells for each
    for(let element of elements)
    {
        tablehtml  += "<tr>";

        for(let property of properties)
        {
            tablehtml  += `<td>${element[property]}</td>`;
        }

        tablehtml  += "</tr>";
    }

    // end of table
    tablehtml += "</table>";

    // add table to the empty div
    document.getElementById("infoTable").innerHTML = tablehtml;
}

