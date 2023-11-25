window.onload = callService;

var datos;
var urlApp = "https://maincode89.github.io/Tasty_Bites_API/menu.json";

function callService () {
    $.ajax({
        url: urlApp,
        type: "get",
        dataType: "json",
        success: onSuccess,
        error: onError
    });
}

function onSuccess (data) {
    datos = data;
    procesarDatos();
}

function onError (jqXHR, textStatus, errorThrow) {
    alert("mensaje de error: " + errorThrow + "\nURL " + urlApp);
}



function cargarComboPaises () {

    for (var i = 0; i < Object.keys(datos).length; i++) {
        var pais = $("<option></option>").val(datos[i].cca3).text(datos[i].name.common)
        $("#nacionalidad").append(pais)
    }

}