var actual_JSON = "";

loadJSON(function(response) {
  // Parse JSON string into object
  actual_JSON = JSON.parse(response);
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
   
class Elements
{
    static GetHeadings()
    {
        return ["Mes", "Año", "Productos", "Vendedor", "Unidades", "Ventas", "Región"];
    }

    static GetProperties()
    {
        return ["Mes", "Año", "Productos", "Vendedor", "Unidades", "Ventas", "Región"];
    }

    static GetElements()
    {
        return actual_JSON 
    }
}
